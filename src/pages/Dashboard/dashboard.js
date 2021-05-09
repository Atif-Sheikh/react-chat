/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    Sidebar,
} from "@chatscope/chat-ui-kit-react";
import firebase from "firebase/app";
import { useDispatch } from 'react-redux';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import Conversations from '../../components/ConversationList/conversationList';
import EmptyContainer from '../../components/EmptyContainer.js/emptyContainer';
import ChatRoom from '../../components/ChatContainer/chatContainer';
import GroupRoom from '../../components/GroupRoom/groupRoom';
import AddGroup from '../../components/AddGroup/addGroup';
import UserProfile from '../../components/UserProfile/userProfile';
import SearchField from '../../components/SearchField/searchField';
import ChatSection from '../../components/ChatSelection/chatSelection';
import GroupProfileSection from '../../components/GroupProfileSection/groupProfileSection';

import './dashboard.css';

const Dashboard = ({ history }) => {
    const [openGroup, setOpenGroup] = useState(false);
    let { path } = useRouteMatch();
    const data = useSelector(state => state.user);
    const dispatch = useDispatch();

    // if (!data?.user) return null;
    const { user } = data;

    useEffect(() => {
        updateOnlineStatus();
        setUser();
        return () => {
            updateOnlineStatus();
        }
    }, []);

    const setUser = async () => {
        try {
            firebase.auth().onAuthStateChanged(async user => {
                if (user?.uid) {
                    let dbUser = await firebase.database().ref(`/users/${user.uid}`).once("value");
                    dispatch({ type: "UPDATE_USER", payload: dbUser.val() });
                }
            });
        } catch (err) {
            console.log(err, "ERROR");
        }
    };

    const updateOnlineStatus = () => {
        if (user) {
            firebase.database().ref('.info/connected').on('value', snapshot => {
                if (snapshot) {
                    firebase.database().ref(`/users/${user.uid}`).update({ status: 'available' });
                } else {
                    firebase.database().ref(`/users/${user.uid}`).update({ status: 'unavailable' });
                }
            });
        }
    };

    return (
        <div style={{
            height: "100vh",
            position: "relative"
        }}>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={false}>
                    <UserProfile history={history} />
                    <SearchField />
                    <ChatSection handleOpenModal={() => setOpenGroup(true)} />
                    <Conversations />
                </Sidebar>

                <Switch>
                    <Route exact path={path}>
                        <EmptyContainer />
                    </Route>
                    <Route exact path={`${path}/:chatID`}>
                        <ChatRoom />
                    </Route>
                    <Route exact path={`${path}/room/:roomID`}>
                        <GroupRoom />
                    </Route>
                    <Route path={`${path}/room/:roomID/:topic`}>
                        <EmptyContainer />
                    </Route>
                </Switch>

                <Sidebar position="right">
                    <Switch>
                        <Route exact path={`${path}/:chatID`}>
                            {/* // Todo: It will change to specific user  */}
                            <GroupProfileSection />
                        </Route>
                        <Route exact path={`${path}/room/:roomID`}>
                            <GroupProfileSection />
                        </Route>
                    </Switch>
                </Sidebar>
            </MainContainer>
            { openGroup && <AddGroup isOpen={openGroup} handleModalClose={() => setOpenGroup(false)} />}
        </div >
    )
}

export default Dashboard;