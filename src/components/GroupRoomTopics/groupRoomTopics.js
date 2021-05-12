/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import {
    Conversation,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useParams,
    useHistory,
} from "react-router-dom";
import { IoMdArrowBack } from 'react-icons/io';

import ListContainer from '../ListContainer/listContainer';

import './groupTopics.css';

const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNTZ5wdImOinohfS8KAbiAvzj6ekn87c9Dg&usqp=CAU";
const GroupRoomTopics = () => {
    const [topics, setTopics] = useState(null);
    const history = useHistory();
    const { roomID } = useParams();

    useEffect(() => {
        getGroupTopic();
    }, [roomID]);

    const getGroupTopic = async () => {
        let dbData = await firebase.database().ref(`/groups/${roomID}`).once('value');
        let topics = dbData.val() ? dbData.val().topics : []  

        setTopics(topics);
    };

    const goBackToTopics = () => {
        history.push(`/dashboard`);
    };

    return (
        <ListContainer>
            <div onClick={goBackToTopics} className="backIconTopics"><IoMdArrowBack size={20} /></div>
            {
                topics?.map((topic, ind) => (
                    <NavLink key={ind.toString()} activeClassName="activeRightNav" to={{ pathname: `/dashboard/room/${roomID}/${topic}` }}>
                        <Conversation name={topic} lastSenderName="Emily" info="Yes i can do it for you">
                            <Avatar src={iconUrl} name="Emily" />
                        </Conversation>
                    </NavLink>
                ))
            }
        </ListContainer>
    )
}

export default GroupRoomTopics;
