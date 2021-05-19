import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip } from "@chakra-ui/react";

import './chatSelection.css';

const ChatSelection = ({ handleOpenModal }) => {
    return (
        <div className="selectionContainer">
            <div className="lastChats">Last chats</div>
            <div className="iconsContainer">
                <Tooltip label="Add group">
                    <div className="addGroupIcon" onClick={handleOpenModal}><AiOutlinePlus /></div>
                </Tooltip>
                <BsThreeDotsVertical className="verticalDots" />
            </div>
        </div>
    )
}

export default ChatSelection;
