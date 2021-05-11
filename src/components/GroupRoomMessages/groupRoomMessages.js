/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    useParams,
    useHistory,
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import {
    Message,
    Avatar,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { IoMdArrowBack } from 'react-icons/io';
import debounce from "lodash/debounce";

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';
import Loader from '../Loader/loader';

import './groupRoomMessages.css';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const GroupRoomMessage = () => {
    const [currentMsg, setCurrentMsg] = useState('');
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState(null);
    const [typingContent, setTypingContent] = useState('');
    const currentUser = useSelector(state => state.user.user);
    const { roomID, topic } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetchGroupMessages();
        addGroupTypingListener();
    }, [roomID, topic, currentUser]);

    const addGroupTypingListener = () => {
        firebase.database().ref(`/chatTypings/${roomID}/${topic}`).on('value', snap => {
            if (snap.val()) {
                let users = Object.keys(snap.val()).filter(name => name !== currentUser.name);
                users.length > 1 && setTypingContent(`${users.join('')}`);
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
    }, 1000);

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

    const goBackToTopics = () => {
        history.push(`/dashboard/room/${roomID}`);
    };

    return (
        <EmptyContainer>

            <CustomChatHeader user={{ name: roomID }} />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">
                <div onClick={goBackToTopics} className="backIcon"><IoMdArrowBack size={20} /></div>
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
            {typingContent && <TypingIndicator className="typingIndicaiton" content={`${typingContent} typing...`} />}
            <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={handleChangeMessage} onSend={sendGroupMessage} />
        </EmptyContainer>
    );
};

export default GroupRoomMessage;
