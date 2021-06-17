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
import { userList, groupListAction } from '../../Actions';
import appConstants from '../../config/appConstants';


const iconUrl = appConstants.defaultGroupImage;
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
            let filteredUsers = await userList();
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
            groupListAction()
        }
    };

    useEffect(() => {
        reducerGroups?.length && setGroupList(reducerGroups);
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
