/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    Sidebar,
    Search,
    ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";
import firebase from "firebase/app";
import { useDispatch } from 'react-redux';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { GrGroup } from 'react-icons/gr';

import Conversations from '../../components/ConversationList/conversationList';
import EmptyContainer from '../../components/EmptyContainer.js/emptyContainer';
import ChatRoom from '../../components/ChatContainer/chatContainer';
import GroupRoom from '../../components/GroupRoom/groupRoom';
import AddGroup from '../../components/AddGroup/addGroup';
import UserProfile from '../../components/UserProfile/userProfile';
import SearchField from '../../components/SearchField/searchField';

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

    const handleLogout = async () => {
        await firebase.auth().signOut();
        history.push('/');
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
                    <UserProfile />
                    <SearchField />
                    <Button rightIcon={<GrGroup color="#2c7a7b" />} colorScheme="teal" variant="outline" width="94%" alignSelf="center" onClick={() => setOpenGroup(true)}>
                        Add Group
                    </Button>
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
                    <ExpansionPanel title="INFO">
                        <Button colorScheme="blue" onClick={handleLogout}>
                            Logout
                        </Button>
                    </ExpansionPanel>
                    <ExpansionPanel title="LOCALIZATION">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="MEDIA">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="SURVEY">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                    <ExpansionPanel title="OPTIONS">
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                        <p>Lorem ipsum</p>
                    </ExpansionPanel>
                </Sidebar>
            </MainContainer>
            {openGroup && <AddGroup isOpen={openGroup} handleModalClose={() => setOpenGroup(false)} />}
        </div>
    )
}

export default Dashboard;