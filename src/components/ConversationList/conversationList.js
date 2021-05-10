/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    ConversationList,
} from "@chatscope/chat-ui-kit-react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from 'react-redux';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useRouteMatch,
    useHistory,
} from "react-router-dom";

import ChatItem from '../Conversation/conversation';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
const Conversations = () => {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const usersList = useSelector(state => state.user.allUsers);
    const currentUser = useSelector(state => state.user.user);
    const [users, setUsers] = useState(null);
    const history = useHistory();

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
        let filteredUsers = users.val() ? Object.values(users.val()).map(usr => ({ name: usr.name, uid: usr.uid, status: usr.status || 'unavailable', img: usr.img || '' })) : [];
        dispatch({ type: "ALL_USERS", payload: filteredUsers });
        if (filteredUsers?.length) {
            history.push({
                pathname: `${url}/${filteredUsers[0].uid}`,
                state: filteredUsers[0],
            });
        }
    };

    return (
        <ConversationList>
            {
                users?.map((usr, ind) => (
                    <ChatItem key={ind} usr={usr} />
                ))
            }

            <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/room/${1}` }}>
                <Conversation name="Group1" lastSenderName="Emily" info="Yes i can do it for you">
                    <Avatar src={iconUrl} name="Emily" />
                </Conversation>
            </NavLink>
            <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/room/${2}` }}>
                <Conversation name="Group2" lastSenderName="Zoe" info="Yes i can do it for you">
                    <Avatar src={iconUrl} name="Zoe" />
                </Conversation>
            </NavLink>
        </ConversationList>
    )
}

export default Conversations;
