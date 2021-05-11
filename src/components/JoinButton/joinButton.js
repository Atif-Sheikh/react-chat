import React from 'react';

import './joinButton.css';

const JoinButton = ({ onPress }) => {
    return (
        <div className="joinBtn" onClick={onPress}>
            Join
        </div>
    )
}

export default JoinButton;
