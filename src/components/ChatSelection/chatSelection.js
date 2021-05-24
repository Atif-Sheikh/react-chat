import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import './chatSelection.css';

const ChatSelection = ({ handleOpenModal }) => {
    const [isOpen, setIsOpen] = useState(false);
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
            { !isOpen && <div className="lastChats">Last chats</div>}
            <div className={isOpen ? "customSearchFieldOpened" : "customSearchField"}>
                <input onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)} placeholder="Search" type="text" />
                <AiOutlineSearch className="searchIcon" />
            </div>
            {
                !isOpen
                &&
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
            }
        </div>
    )
}

export default ChatSelection;
