import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { HiShare } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
    WhatsappShareButton,
} from "react-share";
import { Tooltip } from "@chakra-ui/react";

import './customChatHeader.css';

const CustomChatHeader = ({ user, showLeaveBtn = false, handleLeaveGroup = () => { }, topic = '', handleParticipant = () => { }, showCloseIcon = false, onClickClose = () => {}, discussionClosed }) => {
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));
    const dispatch = useDispatch();

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [topic]);

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
                {showLeaveBtn && <div onClick={handleLeaveGroup} className="leaveGroup">Leave</div>}
                {showLeaveBtn && <div onClick={() => handleParticipant(true)} className="participants">Participants</div>}
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
                {showCloseIcon && showLeaveBtn && <Tooltip label="Mark as solved"><div onClick={onClickClose} className="backIconTopics"><AiFillCloseCircle color="#9a9a9a" size={22} /></div></Tooltip>}
                {discussionClosed && <div className="participants">Solved</div>}
            </div>
        </div>
    )
}

export default CustomChatHeader;
