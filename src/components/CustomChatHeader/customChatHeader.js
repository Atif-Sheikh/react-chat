import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import './customChatHeader.css';

const CustomChatHeader = ({ user, showLeaveBtn = false, handleLeaveGroup = () => { }, topic = '', handleParticipant = () => { } }) => {
    const [isMobile, setIsMobile] = useState(false);
    const dispatch = useDispatch();

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

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
                {user?.name || "N/A"} {topic && ` > ${topic}`}
            </h2>
            <div className="messageAndParticipants">
                {showLeaveBtn && <div onClick={handleLeaveGroup} className="leaveGroup">Leave</div>}
                <div className="messageBtn">Messages</div>
                {showLeaveBtn && <div onClick={() => handleParticipant(true)} className="participants">Participants</div>}
            </div>
        </div>
    )
}

export default CustomChatHeader;
