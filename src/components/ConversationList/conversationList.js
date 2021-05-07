import React, { useState, useEffect } from 'react';
import {
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from 'react-redux';

import ChatItem from '../Conversation/conversation';

const Conversations = () => {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.allUsers);
    const currentUser = useSelector(state => state.user.user);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUserList();
        return () => {
            getUserList();
        }
    }, []);

    useEffect(() => {
        currentUser && usersList && setUsers(usersList.filter(usr => usr.uid !== currentUser.uid));
    }, [currentUser, currentUser?.uid, usersList]);

    const getUserList = async () => {
        let users = await firebase.database().ref('/users').once('value');
        let filteredUsers = users.val() ? Object.values(users.val()).map(usr => ({ name: usr.name, uid: usr.uid, status: usr.status || 'unavailable' })) : [];
        dispatch({ type: "ALL_USERS", payload: filteredUsers });
    };

    return (
        <ConversationList>
            {
                users?.map((usr, ind) => (
                    <ChatItem key={ind} usr={usr} />
                ))
            }
        </ConversationList>
    )
}

export default Conversations;
