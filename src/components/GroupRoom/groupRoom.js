import React, { useState } from 'react';
import {
    useRouteMatch
} from "react-router-dom";
import { Divider } from '@chakra-ui/react';

import EmptyContainer from '../EmptyContainer.js/emptyContainer';
import CustomChatHeader from '../CustomChatHeader/customChatHeader';
import CustomMessageInput from '../CustomMessageInput/customMessageInput';

const GroupRoom = () => {
    const [currentMsg, setCurrentMsg] = useState('');
    const { url } = useRouteMatch();

    // const user = firebase.auth().currentUser; //useSelector(state => state.user);

    // const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    console.log(url, ">>>")
    return (
        <EmptyContainer>

            <CustomChatHeader />
            <Divider className="chatListDivider" orientation="horizontal" />
            <div className="chatListContainer">

            </div>
            <CustomMessageInput placeholder="Type message here" value={currentMsg} onChangeHandler={({ target: { value } }) => setCurrentMsg(value)} onSend={() => { }} />
        </EmptyContainer>
    );
};

export default GroupRoom;
