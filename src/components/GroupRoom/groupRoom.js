import React, { useState } from 'react';
import {
    useRouteMatch,
    NavLink,
    useParams,
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';

const GroupRoom = () => {
    const [currentMsg, setCurrentMsg] = useState('');
    const { url } = useRouteMatch();
    const { roomID } = useParams();

    // const user = firebase.auth().currentUser; //useSelector(state => state.user);
    // const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    return (
        <EmptyContainer>

            <CustomChatHeader user={{ name: roomID }} />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/ramadan` }}>
                    <h1>Ramadan</h1>
                </NavLink>
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/namaz` }}>
                    <h1>Namaz</h1>
                </NavLink>
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/taraweeh` }}>
                    <h1>Tarweeh</h1>
                </NavLink>
            </div>
            <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={({ target: { value } }) => setCurrentMsg(value)} onSend={() => { }} />
        </EmptyContainer>
    );
};

export default GroupRoom;
