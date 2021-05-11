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
} from "@chatscope/chat-ui-kit-react";

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
    const currentUser = useSelector(state => state.user.user);
    const { roomID, topic } = useParams();

    useEffect(() => {
        fetchGroupMessages();
    }, [roomID, topic, currentUser]);

    const fetchGroupMessages = async () => {
        setLoader(true);
        if (currentUser) {
            firebase.database().ref(`/groupMessages/${roomID}/${topic}/messages`).on('value', (snap) => {
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

            <CustomChatHeader user={{ name: roomID }} />
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
            <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={({ target: { value } }) => setCurrentMsg(value)} onSend={sendGroupMessage} />
        </EmptyContainer>
    );
};

export default GroupRoomMessage;
