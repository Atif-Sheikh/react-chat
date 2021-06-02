/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    useParams,
    useHistory,
    useLocation,
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {
    Message,
    Avatar,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import debounce from "lodash/debounce";
import { useDispatch } from 'react-redux';

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';
import Loader from '../Loader/loader';
import JoinButton from '../JoinButton/joinButton';
import { getToken } from '../../firebase';

import './groupRoomMessages.css';
import FirebaseService from 'Utils/firebaseService';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const GroupRoomMessage = () => {
    const [currentMsg, setCurrentMsg] = useState('');
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState(null);
    const [typingContent] = useState('');
    const [discussionClosed, setDiscussionClosed] = useState(false);
    const currentUser = useSelector(state => state.user.user);
    const groupMessages = useSelector(state => state.chat.groupMessages);
    const { roomID, topic } = useParams();
    const history = useHistory();
    const [isJoined, setIsJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));

    const { state } = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchGroupMessages();
        fetchCloseDiscussion();
    }, [roomID, topic, currentUser]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    };

    const fetchGroupMessages = async () => {
        setLoader(true);
        if (currentUser) {
            FirebaseService.listenOnDatabase(`/groupMessages/${roomID}/${topic}/messages`, (data) => dispatch({ type: 'GROUP_MESSAGES', payload: data }), 'time');
        }
        setLoader(false);
    };

    const handleChangeMessage = async ({ target: { value } }) => {
        setCurrentMsg(value);
        FirebaseService.setOnDatabase(`/chatTypings/${roomID}/${topic}/${currentUser.name}`, {
            name: currentUser.name
        });
        handleTypingStop();
    };

    useEffect(() => {
        let dbMsgs = groupMessages ? Object.values(groupMessages).map(msg => ({
            message: msg.msg,
            sentTime: "15 mins ago",
            sender: msg.senderId,
            direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
            position: currentUser.uid === msg.senderId ? "last" : "single",
            img: msg.img,
        })) : [];
        setMessages(dbMsgs);
    }, [groupMessages]);

    const handleTypingStop = debounce(function () {
        FirebaseService.removeFromDatabase(`/chatTypings/${roomID}/${topic}/${currentUser.name}`);
    }, 1500);

    useEffect(() => {
        fetchGroupEntry();
    }, [roomID, currentUser]);

    useEffect(() => {
        if (isJoined && !isMobile) {
            setTokenToGroup();
        }
    }, [isJoined]);

    const setTokenToGroup = async () => {
        let token = await getToken();
        if(token && roomID && currentUser?.uid) {
            await FirebaseService.updateOnDatabase(`groups/${roomID}/members/${currentUser.uid}`, {
                deviceToken: token,
            });
        }
    };

    const joinGroup = async () => {
        if (!currentUser) return false;
        await FirebaseService.setOnDatabase(`groups/${roomID}/members/${currentUser.uid}`, {
            memberName: currentUser.name || 'New User',
            uid: currentUser.uid,
            img: currentUser?.img,
        });
        fetchGroupEntry();
    };

    const fetchGroupEntry = async () => {
        setIsLoading(true);
        let dbData = await FirebaseService.getOnceFromDatabase(`/groups/${roomID}`);
        let memberIDs = dbData.val() ? Object.keys(dbData.val().members) : [];
        if (currentUser && memberIDs.includes(currentUser.uid)) {
            setIsJoined(true);
        } else {
            setIsJoined(false);
        }
        setIsLoading(false);
    };

    const handleLeaveGroup = async () => {
        await FirebaseService.removeFromDatabase(`groups/${roomID}/members/${currentUser?.uid}`);
        fetchGroupEntry();
    };

    const sendGroupMessage = async (e) => {
        e.preventDefault();
        if (currentMsg?.trim() && currentUser?.uid) {
            await FirebaseService.pushOnDatabase(`/groupMessages/${roomID}/${topic}/messages`, {
                msg: currentMsg,
                senderId: currentUser.uid,
                name: currentUser?.name,
                img: currentUser.img || iconUrl,
                time: Date.now(),
            });
        }
        setCurrentMsg('');
    };

    const fetchCloseDiscussion = async () => {
        let closed = await FirebaseService.getOnceFromDatabase(`/groupMessages/${roomID}/${topic}/`);
        if (closed.val()?.closed) {
            setDiscussionClosed(true);
        } else {
            setDiscussionClosed(false);
        }
    };

    const handleCloseDiscussion = async () => {
        setShowParticipants(true);
    };

    const routeToUserProfile = async (senderId) => {
        if (isMobile) {
            dispatch({ type: "SHOW_RIGHT_DRAWER_MOBILE", payload: true });
            dispatch({ type: "RIGHT_PANEL", payload: true });
        }

        history.push({
            pathname: `/dashboard/room/${roomID}/${topic}/${senderId}`,
            state: { groupName: state.groupName || 'N/A' },
        });
    };

    const closeRoomDiscussion = async () => {
        await FirebaseService.updateOnDatabase(`/groupMessages/${roomID}/${topic}/`, { closed: true });
        fetchCloseDiscussion();
        setShowParticipants(false);
    };

    return (
        <EmptyContainer>

            <CustomChatHeader setShowParticipants={setShowParticipants} showParticipants={showParticipants} closeRoomDiscussion={closeRoomDiscussion} discussionClosed={discussionClosed} onClickClose={handleCloseDiscussion} showCloseIcon={!discussionClosed} handleParticipant={setShowParticipants} showLeaveBtn={isJoined} handleLeaveGroup={handleLeaveGroup} user={{ name: roomID }} topic={topic} />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">
                {
                    loader
                        ?
                        <div className="loaderContainer">
                            <Loader />
                        </div>
                        :
                        messages?.map((msg, ind) => {
                            if (msg.direction === 'incoming') {
                                return (
                                    <Message className="receiver" key={ind.toString()} model={msg}>
                                        <Avatar onClick={() => routeToUserProfile(msg.sender)} src={msg.img} name={msg.name} />
                                    </Message>
                                )
                            }

                            return (
                                <Message className="sender" model={msg} key={ind.toString()} />
                            )
                        })
                }
            </div>
            <div className="typingIndicaiton">
                {typingContent && isJoined && <TypingIndicator content={`${typingContent} typing...`} />}
            </div>
            {
                isLoading
                    ?
                    null
                    :
                    isJoined
                        ?
                        <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={handleChangeMessage} onSend={sendGroupMessage} />
                        :
                        <JoinButton onPress={joinGroup} />
            }
            {/* { showParticipants && <GroupParticipantsModal fetchCloseDiscussion={fetchCloseDiscussion} topic={topic} roomID={roomID} isOpen={showParticipants} handleModalClose={() => setShowParticipants(false)} />} */}
        </EmptyContainer>
    );
};

export default GroupRoomMessage;
