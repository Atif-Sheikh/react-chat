import React from 'react';

import './socialBtn.css';

const SocialBtn = ({ Icon, title, iconStyle }) => {
    return (
        <div className="socialIcon">
            <Icon style={iconStyle} />
            <p className="socialIconTitle">{title}</p>
        </div>
    )
}

export default SocialBtn;
