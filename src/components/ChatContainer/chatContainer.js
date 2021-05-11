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
import { useSelector } from 'react-redux';
import firebase from "firebase/app";
import { Divider } from '@chakra-ui/react';
import debounce from "lodash/debounce";

import Loader from '../Loader/loader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';
import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';

import './chatContainer.css';

const ChatRoom = () => {
    const [user, setUser] = useState(null);
    const [currentMsg, setCurrentMsg] = useState('');
    const [allMsgs, setAllMsgs] = useState([]);
    const [loader, setLoader] = useState(false);
    const [typingContent, setTypingContent] = useState('');
    const { chatID } = useParams();
    const currentUser = useSelector(state => state.user.user);

    const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

    const getUser = async () => {
        let user = await firebase.database().ref(`/users/${chatID}`).once("value");
        if (user.val()) {
            setUser(user.val());
        }
    };

    const handleChangeMessage = async ({ target: { value } }) => {
        let path = currentUser.uid + chatID;
        path = path.split('').sort().join('');
        setCurrentMsg(value);
        firebase.database().ref(`/chatTypings/${path}/${currentUser.name}`).set({
            name: currentUser.name
        });
        handleTypingStop();
    };

    const handleTypingStop = debounce(function () {
        let path = currentUser.uid + chatID;
        path = path.split('').sort().join('');
        firebase.database().ref(`/chatTypings/${path}/${currentUser.name}`).remove();
    }, 1500);

    const fetchMessages = async () => {
        try {
            if (!currentUser) return false;
            let path = currentUser.uid + chatID;
            path = path.split('').sort().join('');
            firebase.database().ref(`/chatMessages/${path}`).orderByChild('time').on('value', (snap) => {
                let msgs = snap.val() ? Object.values(snap.val()).map(msg => ({
                    message: msg.msg,
                    sentTime: "15 mins ago",
                    sender: currentUser.uid,
                    direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
                    position: currentUser.uid === msg.senderId ? "last" : "single",
                    img: msg.img,
                })) : [];
                setAllMsgs(msgs);
                setLoader(false);
            });
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
    };

    const addChatTypingListener = () => {
        let path = currentUser.uid + chatID;
        path = path.split('').sort().join('');
        firebase.database().ref(`/chatTypings/${path}`).on('value', snap => {
            if (snap.val()) {
                let users = Object.keys(snap.val()).filter(name => name !== currentUser.name);
                users.length > 0 && setTypingContent(`${users.join('')}`);
            } else {
                setTypingContent('');
            }
        });
    };

    useEffect(() => {
        setAllMsgs([]);
        getUser();
        addChatTypingListener();
        return () => {
            getUser();
            addChatTypingListener()
        }
    }, [chatID]);

    useEffect(() => {
        setLoader(true);
        fetchMessages();
        return () => {
            fetchMessages();
        }
    }, [user]);

    const handleSendMsg = async (e) => {
        e.preventDefault();
        if (currentMsg && currentUser) {
            let path = currentUser.uid + chatID;
            path = path.split('').sort().join('');
            await firebase.database().ref(`/chatMessages/${path}`).push({
                msg: currentMsg,
                senderId: currentUser.uid,
                name: user?.name,
                img: user.img || iconUrl,
                reciverId: chatID,
                time: Date.now(),
            });
            setCurrentMsg('');
        }
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
                                        <Avatar src={msg.img} name="Zoe" />
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
