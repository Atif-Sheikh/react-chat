/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
} from "@chatscope/chat-ui-kit-react";
import {
    useParams
} from "react-router-dom";
import firebase from "firebase/app";
import Loader from '../Loader/loader';

const ChatRoom = () => {
    const [user, setUser] = useState(null);
    const [currentMsg, setCurrentMsg] = useState('');
    const [allMsgs, setAllMsgs] = useState([]);
    const [loader, setLoader] = useState(false);
    const { chatID } = useParams();
    const currentUser = firebase.auth().currentUser; //useSelector(state => state.user);

    const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

    const getUser = async () => {
        let user = await firebase.database().ref(`/users/${chatID}`).once("value");
        if (user.val()) {
            setUser(user.val());
        }
    };

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
                    direction: chatID === msg.reciverId ? "incoming" : "outgoing",
                    position: chatID === msg.reciverId ? "single" : "last",
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

    useEffect(() => {
        setAllMsgs([]);
        getUser();
        return () => {
            getUser();
        }
    }, [chatID]);

    useEffect(() => {
        setLoader(true);
        fetchMessages();
        return () => {
            fetchMessages();
        }
    }, [user]);

    const handleSendMsg = async () => {
        if (currentMsg && currentUser) {
            let path = currentUser.uid + chatID;
            path = path.split('').sort().join('');
            await firebase.database().ref(`/chatMessages/${path}`).push({
                msg: currentMsg,
                senderId: chatID,
                name: user?.name,
                img: user.img || iconUrl,
                reciverId: currentUser.uid,
                time: Date.now(),
            });

            setCurrentMsg('');
        }
    };
    
    return (
        <ChatContainer>

            <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar src={user?.img ? user.img : iconUrl} name="Zoe" />
                <ConversationHeader.Content userName={user?.name} info={user?.status} />
                <ConversationHeader.Actions>
                    <VoiceCallButton />
                    <VideoCallButton />
                    <InfoButton />
                </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
                {/* // Typing indicator for future use */}
                {/* typingIndicator={<TypingIndicator content="Zoe is typing" />} */}
                {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}

                {
                    loader
                        ?
                        <MessageList.Content className="loaderContainer">
                            <Loader />
                        </MessageList.Content>
                        :
                        allMsgs.map((msg, ind) => {
                            if (msg.direction === 'incoming') {
                                return (
                                    <Message key={ind.toString()} model={msg}>
                                        <Avatar src={msg.img} name="Zoe" />
                                    </Message>
                                )
                            }

                            return (
                                <Message model={msg} key={ind.toString()} />
                            )
                        })
                }


            </MessageList>
            <MessageInput placeholder="Type message here" value={currentMsg} onChange={val => setCurrentMsg(val)} onSend={handleSendMsg} />
        </ChatContainer>
    )
}

export default ChatRoom;
