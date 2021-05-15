/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    useParams,
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import {
    Message,
    Avatar,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import debounce from "lodash/debounce";

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';
import Loader from '../Loader/loader';
import JoinButton from '../JoinButton/joinButton';
import GroupParticipantsModal from '../GroupParticipants/groupParticipants';

import './groupRoomMessages.css';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const GroupRoomMessage = () => {
    const [currentMsg, setCurrentMsg] = useState('');
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState(null);
    const [typingContent, setTypingContent] = useState('');
    const currentUser = useSelector(state => state.user.user);
    const { roomID, topic } = useParams();
    const [isJoined, setIsJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect(() => {
        fetchGroupMessages();
        addGroupTypingListener();
    }, [roomID, topic, currentUser]);

    const addGroupTypingListener = () => {
        firebase.database().ref(`/chatTypings/${roomID}/${topic}`).on('value', snap => {
            if (snap.val()) {
                let users = Object.keys(snap.val()).filter(name => name !== currentUser.name);
                users.length > 0 && setTypingContent(`${users.join('')}`);
            } else {
                setTypingContent('');
            }
        });
    };

    const fetchGroupMessages = async () => {
        let firebaseRef = null;
        setLoader(true);
        if (currentUser) {
            firebaseRef = firebase.database().ref(`/groupMessages/${roomID}/${topic}/messages`).orderByChild('time').on('value', (snap) => {
                let dbMsgs = snap.val() ? Object.values(snap.val()).map(msg => ({
                    message: msg.msg,
                    sentTime: "15 mins ago",
                    sender: currentUser.uid,
                    direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
                    position: currentUser.uid === msg.senderId ? "last" : "single",
                    img: msg.img,
                })) : [];
                setMessages(dbMsgs);
            });
        }
        setLoader(false);

        return firebaseRef;
    };

    const handleChangeMessage = async ({ target: { value } }) => {
        setCurrentMsg(value);
        firebase.database().ref(`/chatTypings/${roomID}/${topic}/${currentUser.name}`).set({
            name: currentUser.name
        });
        handleTypingStop();
    };

    const handleTypingStop = debounce(function () {
        firebase.database().ref(`/chatTypings/${roomID}/${topic}/${currentUser.name}`).remove();
    }, 1500);

    useEffect(() => {
        fetchGroupEntry();
    }, [roomID, currentUser]);

    const joinGroup = async () => {
        if (!currentUser) return false;
        await firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).set({
            memberName: currentUser.name || 'New User',
            uid: currentUser.uid,
            img: currentUser?.img,
        });
        fetchGroupEntry();
    };

    const fetchGroupEntry = async () => {
        setIsLoading(true);
        let dbData = await firebase.database().ref(`/groups/${roomID}`).once('value');
        let memberIDs = dbData.val() ? Object.keys(dbData.val().members) : [];
        if (currentUser && memberIDs.includes(currentUser.uid)) {
            setIsJoined(true);
        } else {
            setIsJoined(false);
        }
        setIsLoading(false);
    };

    const handleLeaveGroup = async () => {
        await firebase.database().ref(`groups/${roomID}/members/${currentUser?.uid}`).remove();
        fetchGroupEntry();
    };

    const sendGroupMessage = async (e) => {
        e.preventDefault();
        if (currentMsg?.trim()) {
            await firebase.database().ref(`/groupMessages/${roomID}/${topic}/messages`).push({
                msg: currentMsg,
                senderId: currentUser.uid,
                name: currentUser?.name,
                img: currentUser.img || iconUrl,
                time: Date.now(),
            });
        }
        setCurrentMsg('');
    };

    return (
        <EmptyContainer>

            <CustomChatHeader handleParticipant={setShowParticipants} showLeaveBtn={isJoined} handleLeaveGroup={handleLeaveGroup} user={{ name: roomID }} topic={topic} />
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
                                        <Avatar src={msg.img} name={msg.name} />
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
            { showParticipants && <GroupParticipantsModal roomID={roomID} isOpen={showParticipants} handleModalClose={() => setShowParticipants(false)} />}
        </EmptyContainer>
    );
};

export default GroupRoomMessage;
