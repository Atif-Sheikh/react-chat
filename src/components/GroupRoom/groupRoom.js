import React from 'react';
import {
    ChatContainer,
    MessageList,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import {
    NavLink,
    useRouteMatch
} from "react-router-dom";
import {
    useParams
} from "react-router-dom";
import firebase from "firebase/app";

const GroupRoom = () => {
    const { roomID } = useParams();
    const { url } = useRouteMatch();

    const user = firebase.auth().currentUser; //useSelector(state => state.user);

    const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    console.log(url, ">>>")
    return (
        <ChatContainer>

            <ConversationHeader>
            </ConversationHeader>
            <MessageList>
            <MessageList.Content className="loaderContainer">
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/ramadan` }}>
                    <h1>Ramadan</h1>
                </NavLink>
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/namaz` }}>
                    <h1>Namaz</h1>
                </NavLink>
                <NavLink activeClassName="activeRightNav" to={{ pathname: `${url}/taraweeh` }}>
                  <h1>Tarweeh</h1>
                </NavLink>
            </MessageList.Content>
            </MessageList>
        </ChatContainer >
    )
}

export default GroupRoom;
