/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useParams,
    useHistory,
    useRouteMatch,
} from "react-router-dom";

import ChatItem from '../Conversation/conversation';
import ListContainer from '../ListContainer/listContainer';
import FirebaseService from 'Utils/firebaseService';

const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNTZ5wdImOinohfS8KAbiAvzj6ekn87c9Dg&usqp=CAU";
const Conversations = () => {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.allUsers);
    const [groupList, setGroupList] = useState([]);
    const currentUser = useSelector(state => state.user.user);
    const reducerGroups = useSelector(state => state.user.userGroups);
    const [users, setUsers] = useState(null);
    const history = useHistory();
    const { roomID, topic, chatID } = useParams();
    const { url } = useRouteMatch();

    useEffect(() => {
        getUserList();
        getGroupsList();
    }, [currentUser]);

    useEffect(() => {
        currentUser && usersList && setUsers(usersList.filter(usr => usr.uid !== currentUser.uid));
    }, [currentUser, currentUser?.uid, usersList]);

    const getUserList = async () => {
        if (currentUser) {
            let users = await FirebaseService.getOnceFromDatabase('/users');
            let filteredUsers = users.val() ? Object.values(users.val()).map(usr => ({ name: usr.name, uid: usr?.uid, status: usr.status || 'unavailable', img: usr.img || '' })).filter(usr => usr?.uid !== currentUser?.uid) : [];
            dispatch({ type: "ALL_USERS", payload: filteredUsers });
            if (filteredUsers?.length && !roomID && !topic && !chatID) {
                history.push({
                    pathname: `${url}/${filteredUsers[0].uid}`,
                    state: filteredUsers[0],
                });
            }
        }
    };

    const getGroupsList = async () => {
        if (currentUser) {
            FirebaseService.listenOnDatabaseWithoutOrder('/groups', (data) => dispatch({ type: "ALL_GROUPS", payload: data }));
        }
    };

    useEffect(() => {
        let filtered = reducerGroups ? Object.values(reducerGroups) : [];
        let joinedGroups = [];
        filtered.forEach(group => {
            joinedGroups.push(group);
        });
        setGroupList(joinedGroups);
    }, [reducerGroups]);

    return (
        <ListContainer>
            {
                users?.map((usr, ind) => (
                    <ChatItem key={ind} usr={usr} />
                ))
            }

            {
                groupList?.map((group, ind) => (
                    <NavLink key={ind.toString()} activeClassName="activeRightNav" to={{ pathname: `/dashboard/room/${group.groupId}`, state: { groupName: group.groupName } }}>
                        <Conversation name={group.groupName} lastSenderName="Emily" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Emily" />
                        </Conversation>
                    </NavLink>
                ))
            }
        </ListContainer>
    )
}

export default Conversations;
