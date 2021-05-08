import React from 'react';
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
    TypingIndicator,
    MessageSeparator,
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
