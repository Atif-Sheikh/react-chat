/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    useParams,
    useHistory,
    useLocation,
} from "react-router-dom";
import { IoMdArrowBack } from 'react-icons/io';

import ListContainer from '../ListContainer/listContainer';
import GroupRoomTopicItem from '../GroupRoomTopicItem/groupRoomTopicItem';

import './groupTopics.css';

import { groupTopic } from 'Actions'

const GroupRoomTopics = () => {
    const [topics, setTopics] = useState(null);
    const history = useHistory();
    const { roomID } = useParams();
    const { state } = useLocation();

    useEffect(() => {
        getGroupTopic();
    }, [roomID]);

    const getGroupTopic = async () => {
        let dbData = await groupTopic(`/groups/${roomID}`);
        let topics = dbData.val() ? dbData.val().topics : []

        setTopics(topics);
    };

    const goBackToTopics = () => {
        history.push(`/dashboard`);
    };

    return (
        <ListContainer>
            <div onClick={goBackToTopics} className="backIconTopics">
                <div>
                    <IoMdArrowBack size={20} />
                </div>
                <div>{state?.groupName || ''}</div>
            </div>
            {
                topics?.map((topic, ind) => (
                    <GroupRoomTopicItem key={ind.toString()} topic={topic} ind={ind} groupName={state?.groupName} />
                ))
            }
        </ListContainer>
    )
}

export default GroupRoomTopics;
