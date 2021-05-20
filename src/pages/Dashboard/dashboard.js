/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    Sidebar,
} from "@chatscope/chat-ui-kit-react";
import { useDispatch } from 'react-redux';
import firebase from "firebase/app";
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import { getToken } from '../../firebase';
import Conversations from '../../components/ConversationList/conversationList';
import ChatRoom from '../../components/ChatContainer/chatContainer';
import AddGroup from '../../components/AddGroup/addGroup';
import UserProfile from '../../components/UserProfile/userProfile';
import SearchField from '../../components/SearchField/searchField';
import ChatSection from '../../components/ChatSelection/chatSelection';
import GroupProfileSection from '../../components/GroupProfileSection/groupProfileSection';
import GroupRoomMessages from '../../components/GroupRoomMessages/groupRoomMessages';
import GroupRoomTopics from '../../components/GroupRoomTopics/groupRoomTopics';
import UserProfileSection from '../../components/UserProfileSection/userProfileSection';

import './dashboard.css';

const Dashboard = ({ history }) => {
    const [openGroup, setOpenGroup] = useState(false);
    let { path } = useRouteMatch();
    const data = useSelector(state => state.user);
    const isRightPanelOpen = useSelector(state => state.dashboard.rightPanelOpen);
    const hideCenterContent = useSelector(state => state.dashboard.hideCenterContent);
    const showRightDrawerMobile = useSelector(state => state.dashboard.showRightDrawerMobile);
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));
    const dispatch = useDispatch();

    // if (!data?.user) return null;
    const { user } = data;

    useEffect(() => {
        setUser();
        updateOnlineStatus();
        window.addEventListener('resize', handleWindowSizeChange);

        isMobile && dispatch({ type: "HIDE_CENTER_CONTENT", payload: true });

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
            updateOnlineStatus();
        }
    }, []);

    useEffect(() => {
        saveTokenToDB();
    }, [user]);

    const saveTokenToDB = async () => {
        try {
            const token = await getToken();
            if (user && token) {
                firebase.database().ref(`/users/${user.uid}`).update({ deviceToken: token });
            }
        } catch (err) {
            console.log(err, "ERROR");
        }
    };

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    };

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
        }} className={showRightDrawerMobile ? 'rightMobileDrawerContainer' : `${isRightPanelOpen ? 'rightOpen' : 'rightClose'} ${hideCenterContent ? 'leftOpen' : 'leftClose'}`}>
            <MainContainer responsive>
                {
                    showRightDrawerMobile ?
                        null
                        :
                        <Sidebar position="left" scrollable={true}>
                            <UserProfile history={history} />
                            <SearchField />
                            <ChatSection handleOpenModal={() => setOpenGroup(true)} />
                            <Switch>
                                <Route exact path={path}>
                                    <Conversations />
                                </Route>
                                <Route path={`${path}/room/:roomID`}>
                                    <GroupRoomTopics />
                                </Route>
                                <Route exact path={`${path}/:chatID`}>
                                    <Conversations />
                                </Route>
                                <Route path={`${path}/room/:roomID/:topic`}>
                                    <GroupRoomTopics />
                                </Route>
                            </Switch>
                        </Sidebar>
                }

                {
                    hideCenterContent
                        ||
                        showRightDrawerMobile
                        ?
                        null
                        :
                        <Switch>
                            <Route path={`${path}/room/:roomID/:topic`}>
                                <GroupRoomMessages />
                            </Route>
                            <Route path={`${path}/:chatID`}>
                                <ChatRoom />
                            </Route>
                        </Switch>
                }

                <Sidebar scrollable={true} className={showRightDrawerMobile ? 'rightMobileDrawer' : ''} position="right">
                    <Switch>
                        <Route exact path={`${path}/:chatID`}>
                            <UserProfileSection />
                        </Route>
                        <Route path={`${path}/room/:roomID/:topic/:profileId`}>
                            <UserProfileSection />
                        </Route>
                        <Route path={`${path}/room/:roomID`}>
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