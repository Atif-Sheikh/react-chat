import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { HiShare } from 'react-icons/hi';
import { AiFillCloseCircle, AiOutlineLogout } from 'react-icons/ai';
import { BsFillInfoCircleFill, BsCheckAll } from 'react-icons/bs';
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
                {showLeaveBtn && <Tooltip label="Leave group"><div onClick={handleLeaveGroup} className="leaveGroup"><AiOutlineLogout size={18} color="#9a9a9a" /></div></Tooltip>}
                {showLeaveBtn && <Tooltip label="Group info"><div onClick={() => handleParticipant(true)} className="participants"><BsFillInfoCircleFill size={18} color="#9a9a9a" /></div></Tooltip>}
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
                {showCloseIcon && showLeaveBtn && <Tooltip label="Mark as solved"><div onClick={onClickClose} className="backIcon"><AiFillCloseCircle color="#9a9a9a" size={22} /></div></Tooltip>}
                {discussionClosed && <div className="participants"><BsCheckAll size={22} color="#00a300b0" /></div>}
            </div>
        </div>
    )
}

export default CustomChatHeader;
