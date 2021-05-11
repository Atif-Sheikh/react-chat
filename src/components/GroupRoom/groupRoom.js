/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    useRouteMatch,
    NavLink,
    useParams,
} from "react-router-dom";
import { Divider, HStack, Tag } from '@chakra-ui/react';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import JoinButton from '../JoinButton/joinButton';

import './groupRoom.css';

const GroupRoom = () => {
    const [isJoined, setIsJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [groupTopics, setGroupTopics] = useState([]);
    const currentUser = useSelector(state => state.user.user);
    const { url } = useRouteMatch();
    const { roomID } = useParams();

    useEffect(() => {
        fetchGroupEntry();
    }, [roomID]);

    const fetchGroupEntry = async () => {
        setIsLoading(true);
        let dbData = await firebase.database().ref(`/groups/${roomID}`).once('value');
        let memberIDs = dbData.val() ? Object.keys(dbData.val().members) : [];
        let topics = dbData.val().topics;
        if (currentUser && memberIDs.includes(currentUser.uid)) {
            setIsJoined(true);
        } else {
            setIsJoined(false);
        }
        setGroupTopics(topics);
        setIsLoading(false);
    };

    const joinGroup = async () => {
        await firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).set({
            memberName: currentUser.name || 'New User',
            uid: currentUser.uid,
        });
        fetchGroupEntry();
    };

    const handleLeaveGroup = async () => {
        await firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).remove();
        fetchGroupEntry();
    };

    // const user = firebase.auth().currentUser; //useSelector(state => state.user);
    // const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    return (
        <EmptyContainer>

            <CustomChatHeader showLeaveBtn={isJoined} handleLeaveGroup={handleLeaveGroup} user={{ name: roomID }} />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">
                {
                    isJoined
                        ?
                        <div className="selectTopic">
                            Select the Group Topic
                        </div>
                        :
                        null
                }
                <div className="tagContainer">
                    {
                        isJoined
                            ?
                            <HStack spacing={4}>
                                {
                                    groupTopics?.map((topic, ind) => (
                                        <NavLink key={ind.toString()} activeClassName="activeRightNav" to={{ pathname: `${url}/${topic}` }}>
                                            <Tag size="lg" variant="solid" colorScheme="teal">
                                                {topic}
                                            </Tag>
                                        </NavLink>
                                    ))
                                }
                            </HStack>
                            :
                            null
                    }
                </div>
            </div>
            {
                isLoading
                    ?
                    null
                    :
                    isJoined
                        ?
                        null
                        // <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={({ target: { value } }) => setCurrentMsg(value)} onSend={() => { }} />
                        :
                        <JoinButton onPress={joinGroup} />
            }
        </EmptyContainer>
    );
};

export default GroupRoom;
