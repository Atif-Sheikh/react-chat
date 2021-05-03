import React from 'react';

import './socialBtn.css';

const SocialBtn = ({ Icon, title, iconStyle, onPress = () => {}, id = "" }) => {
    return (
        <div onClick={onPress} className="socialIcon" id={id}>
            <Icon style={iconStyle} />
            <p className="socialIconTitle">{title}</p>
        </div>
    )
}

export default SocialBtn;
