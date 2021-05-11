import React from 'react';

import './customChatHeader.css';

const CustomChatHeader = ({ user, showLeaveBtn = false, handleLeaveGroup = () => { } }) => {
    return (
        <div className="chatHeaderContainer">
            <h2 className="chatUsersName">
                {user?.name || "N/A"}
            </h2>
            <div className="messageAndParticipants">
                {showLeaveBtn && <div onClick={handleLeaveGroup} className="leaveGroup">Leave</div>}
                <div className="messageBtn">Messages</div>
                <div className="participants">Participants</div>
            </div>
        </div>
    )
}

export default CustomChatHeader;
