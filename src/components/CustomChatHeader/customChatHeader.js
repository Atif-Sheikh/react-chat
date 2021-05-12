import React from 'react';

import './customChatHeader.css';

const CustomChatHeader = ({ user, showLeaveBtn = false, handleLeaveGroup = () => { }, topic = '' }) => {
    return (
        <div className="chatHeaderContainer">
            <h2 className="chatUsersName">
                {user?.name || "N/A"} {topic && ` > ${topic}`}
            </h2>
            <div className="messageAndParticipants">
                {showLeaveBtn && <div onClick={handleLeaveGroup} className="leaveGroup">Leave</div>}
                <div className="messageBtn">Messages</div>
                {showLeaveBtn && <div className="participants">Participants</div>}
            </div>
        </div>
    )
}

export default CustomChatHeader;
