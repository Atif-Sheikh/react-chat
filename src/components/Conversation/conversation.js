import React from 'react';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useRouteMatch
} from "react-router-dom";

import './conversation.css';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const ChatItem = ({ usr: { name, lastMessage, lastSender, status, img, uid } }) => {
    let { url } = useRouteMatch();

    return (
        <NavLink className="chatConversation" activeClassName="activeRightNav" to={{ pathname: `${url}/${uid}`, state: { name, lastMessage, lastSender, status, img, uid } }}>
            <Conversation name={name} lastActivityTime="43 min" info="Hi">
                <Avatar src={img ? `${img}` : iconUrl} name={name} />
            </Conversation>
        </NavLink>
    );
};

export default ChatItem;
