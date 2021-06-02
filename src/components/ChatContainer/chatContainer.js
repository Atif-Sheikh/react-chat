/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Message,
    Avatar,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import {
    useParams
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/loader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';
import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import { sendNotification } from '../../Utils/notification';

import './chatContainer.css';
import FirebaseService from 'Utils/firebaseService';
import {getMessages, sendTyping, removeTyping, sendMessage, getUser} from 'Actions';
import { set } from 'lodash';

const ChatRoom = () => {
    const [user, setUser] = useState(null);
    const [currentMsg, setCurrentMsg] = useState('');
    const [allMsgs, setAllMsgs] = useState([]);
    const [loader, setLoader] = useState(false);
    const [typingContent] = useState('');
    const { chatID } = useParams();
    const currentUser = useSelector(state => state.user.user);
    const messages = useSelector(state => state.chat.chatMessages);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));
    const state = useSelector((state) => state.user.chatUser)

    const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

    useEffect(() => {
        if (state) {
            setUser(state);
        }else{
            setUser(null)
        }
    }, [state])

    useEffect(() => {
        let msgs = messages ? Object.values(messages).map(msg => ({
                message: msg.msg,
                sentTime: "15 mins ago",
                sender: currentUser.uid,
                direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
                position: currentUser.uid === msg.senderId ? "last" : "single",
                img: msg.img,
            })) : [];
            setAllMsgs(msgs);
            setLoader(false);
    }, [messages]);

    const handleChangeMessage = async ({ target: { value } }) => {
        let path = currentUser.uid + chatID;
        path = path.split('').sort().join('');
        setCurrentMsg(value);
        await sendTyping(`/chatTypings/${path}/${currentUser.name}`, { name: currentUser.name });
        handleTypingStop();
    };

    const handleTypingStop = debounce(function () {
        let path = currentUser.uid + chatID;
        path = path.split('').sort().join('');
        removeTyping(`/chatTypings/${path}/${currentUser.name}`);
    }, 1500);

    const fetchMessages = async () => {
        try {
            if (!currentUser) return false;
            let path = currentUser.uid + chatID;
            path = path.split('').sort().join('');
            getMessages(`/chatMessages/${path}`)
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    };

    useEffect(() => {
        setAllMsgs([]);
        getUser(`/users/${chatID}`);
    }, [chatID]);

    useEffect(() => {
        setLoader(true);
        fetchMessages();
    }, [user, currentUser]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    };

    const handleSendMsg = async (e) => {
        e.preventDefault();
        if (currentMsg && currentUser) {
            let path = currentUser.uid + chatID;
            path = path.split('').sort().join('');
            await sendMessage(`/chatMessages/${path}`, {
                msg: currentMsg,
                senderId: currentUser.uid,
                name: user?.name,
                img: user.img || iconUrl,
                reciverId: chatID,
                time: Date.now(),
            });
            setCurrentMsg('');
            if (user?.deviceToken) {
                sendNotification({ title: currentUser.name, body: currentMsg, deviceToken: user.deviceToken });
            }
        }
    };

    const routeToUserProfile = () => {
        if (isMobile) {
            dispatch({ type: "SHOW_RIGHT_DRAWER_MOBILE", payload: true });
        }
        dispatch({ type: "RIGHT_PANEL", payload: true });
    };

    return (
        <EmptyContainer>

            <CustomChatHeader user={user} />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">
                {/* // Typing indicator for future use */}
                {/* typingIndicator={<TypingIndicator content="Zoe is typing" />} */}
                {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}

                {
                    loader
                        ?
                        <div className="loaderContainer">
                            <Loader />
                        </div>
                        :
                        allMsgs.map((msg, ind) => {
                            if (msg.direction === 'incoming') {
                                return (
                                    <Message className="receiver" key={ind.toString()} model={msg}>
                                        <Avatar onClick={routeToUserProfile} src={msg.img} name="Zoe" />
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
                {typingContent && <TypingIndicator content={`${typingContent} typing...`} />}
            </div>
            <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={handleChangeMessage} onSend={handleSendMsg} />
        </EmptyContainer>
    )
}

export default ChatRoom;
