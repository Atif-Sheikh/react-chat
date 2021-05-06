import React, { useState } from 'react';
import {
    ConversationList,
} from "@chatscope/chat-ui-kit-react";

import ChatItem from '../Conversation/conversation';

const Conversations = () => {
    const [users] = useState([
        { name: "Lilly", lastMessage: "Yes i can do it for you", lastSender: "Lilly", status: "available" },
        { name: "Joe", lastMessage: "Yes i can do it for you", lastSender: "Joe", status: "unavailable" },
        { name: "Emily", lastMessage: "Yes i can do it for you", lastSender: "Emily", status: "available" },
        { name: "Eliot", lastMessage: "Yes i can do it for you", lastSender: "Eliot", status: "unavailable" },
        { name: "Patrik", lastMessage: "Yes i can do it for you", lastSender: "Patrik", status: "available" },
        { name: "Kai", lastMessage: "Yes i can do it for you", lastSender: "Kai", status: "available" },
    ]);

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
