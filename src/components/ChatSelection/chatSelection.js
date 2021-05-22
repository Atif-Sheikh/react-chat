import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './chatSelection.css';

const ChatSelection = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut().then(() => {
                dispatch({ type: "LOGOUT", payload: null });
                history.replace('/login');
            })
                .catch(err => {
                    throw err;
                });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="selectionContainer">
            <div className="lastChats">Last chats</div>
            <div className="iconsContainer">
                <Tooltip label="Add group">
                    <div className="addGroupIcon" onClick={handleOpenModal}><AiOutlinePlus /></div>
                </Tooltip>
                <Menu>
                    <MenuButton><BsThreeDotsVertical className="verticalDots" /></MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

export default ChatSelection;
