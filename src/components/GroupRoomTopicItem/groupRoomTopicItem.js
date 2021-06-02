/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useParams,
} from "react-router-dom";

import './groupRoomTopicItem.css';
import FirebaseService from 'Utils/firebaseService';

const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNTZ5wdImOinohfS8KAbiAvzj6ekn87c9Dg&usqp=CAU";

const GroupRoomTopicItem = ({ topic, groupName }) => {
    const [solved, setSolved] = useState(false);
    const dispatch = useDispatch();
    const { roomID } = useParams();

    useEffect(() => {
        fetchIsSolved();
    }, [roomID, topic]);

    const fetchIsSolved = async () => {
        const data = await FirebaseService.getOnceFromDatabase(`/groupMessages/${roomID}/${topic}`);
        if (data.val()?.closed) {
            setSolved(true);
        } else {
            setSolved(false);
        }
    };

    const handleConversationClick = () => {
        dispatch({ type: "HIDE_CENTER_CONTENT", payload: false });
    };

    return (
        <NavLink className="groupTopicNav" activeClassName="activeRightNav" to={{ pathname: `/dashboard/room/${roomID}/${topic}`, state: { groupName: groupName } }}>
            <Conversation onClick={handleConversationClick} name={topic} lastSenderName="Emily" info="Yes i can do it for you">
                <Avatar src={iconUrl} name="Emily" />
            </Conversation>
            {solved && <div className="solvedIndication" />}
        </NavLink>
    );
};

export default GroupRoomTopicItem;
