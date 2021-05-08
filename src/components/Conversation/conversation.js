import React from 'react';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const ChatItem = ({usr: {name, lastMessage, lastSender, status, img}}) => {
    return (
        <Conversation name={name} lastSenderName={lastSender} info={lastMessage}>
            <Avatar src={img ? img : iconUrl} name={"name"} status={status} />
        </Conversation>
    )
}

export default ChatItem;
