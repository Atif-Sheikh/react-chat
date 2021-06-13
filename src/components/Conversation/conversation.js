import React from 'react';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import appConstants from '../../config/appConstants';

import './conversation.css';

const iconUrl = appConstants.defaultImage;

const ChatItem = ({ usr: { name, lastMessage, lastSender, status, img, uid } }) => {
    const dispatch = useDispatch();

    const handleConversationClick = () => {
        dispatch({ type: "HIDE_CENTER_CONTENT", payload: false });
    };

    return (
        <NavLink className="chatConversation" activeClassName="activeRightNav" to={{ pathname: `/dashboard/${uid}`, state: { name, lastMessage, lastSender, status, img, uid } }}>
            <Conversation onClick={handleConversationClick} name={name} lastActivityTime="43 min" info="Hi">
                <Avatar src={img ? `${img}` : iconUrl} name={name} />
            </Conversation>
        </NavLink>
    );
};

export default ChatItem;
