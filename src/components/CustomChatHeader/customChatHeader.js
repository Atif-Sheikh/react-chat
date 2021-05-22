import React, { useState, useEffect, memo } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { HiShare } from 'react-icons/hi';
import { AiFillCloseCircle, AiOutlineLogout } from 'react-icons/ai';
import { BsFillInfoCircleFill, BsCheckAll } from 'react-icons/bs';
import {
    WhatsappShareButton,
} from "react-share";
import { Tooltip, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { useLocation, useHistory, useParams } from 'react-router-dom';

import './customChatHeader.css';

const CustomChatHeader = ({ user, showLeaveBtn = false, handleLeaveGroup = () => { }, topic = '', showCloseIcon = false, onClickClose = () => { }, discussionClosed }) => {
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));
    const dispatch = useDispatch();
    const { state } = useLocation();
    const history = useHistory();
    const { roomID } = useParams();

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [topic]);

    const handleGroupInfo = () => {
        if (isMobile) {
            dispatch({ type: "SHOW_RIGHT_DRAWER_MOBILE", payload: true });
        }
        history.push({
            pathname: `/dashboard/room/${roomID}/${topic}`,
            state: { groupName: state.groupName || 'N/A' },
        });
        dispatch({ type: "RIGHT_PANEL", payload: true });
    };

    const handleBack = () => {
        dispatch({ type: "HIDE_CENTER_CONTENT", payload: true });
    };

    return (
        <div className="chatHeaderContainer">
            {
                isMobile
                    ?
                    <IoMdArrowBack onClick={handleBack} className="chatBackIcon" />
                    :
                    null
            }
            <h2 className="chatUsersName">
                {topic || user?.name || "N/A"}
            </h2>
            <div className="messageAndParticipants">
                {showLeaveBtn && <Tooltip label="Leave group"><div onClick={handleLeaveGroup} className="leaveGroup"><AiOutlineLogout size={18} color="#9a9a9a" /></div></Tooltip>}
                {showLeaveBtn && <Tooltip label="Group info"><div onClick={handleGroupInfo} className="participants"><BsFillInfoCircleFill size={18} color="#9a9a9a" /></div></Tooltip>}
                {
                    showLeaveBtn
                        ?
                        <Tooltip label="Share">
                            <WhatsappShareButton
                                url={window.location.href}
                                title={'title'}
                            >
                                <div className="backIconTopics"><HiShare color="#9a9a9a" size={20} /></div>
                            </WhatsappShareButton>
                        </Tooltip>
                        :
                        null
                }
                {showCloseIcon && showLeaveBtn &&
                    <Popover>
                        <PopoverTrigger>
                            <Button onClick={onClickClose}>
                                <AiFillCloseCircle color="#9a9a9a" size={22} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                        </PopoverContent>
                    </Popover>
                }
                {discussionClosed && <div className="participants"><BsCheckAll size={22} color="#00a300b0" /></div>}
            </div>
        </div>
    )
}

export default memo(CustomChatHeader);
