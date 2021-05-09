import React from 'react';

import './customChatHeader.css';

const CustomChatHeader = ({ user }) => {
    return (
        <div className="chatHeaderContainer">
            <h2 className="chatUsersName">
                {user?.name || "N/A"}
            </h2>
            <div className="messageAndParticipants">
                <div className="messageBtn">Messages</div>
                <div className="participants">Participants</div>
            </div>
        </div>
    )
}

export default CustomChatHeader;
