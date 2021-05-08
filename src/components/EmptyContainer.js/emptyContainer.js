import React from 'react';
import {
    ChatContainer,
    MessageList,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

const EmptyContainer = () => {
    
    return (
        <ChatContainer>
            <ConversationHeader />
            <MessageList />
        </ChatContainer>
    )
}

export default EmptyContainer;
