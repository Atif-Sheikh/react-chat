import React from 'react';
import { ImSmile2 } from 'react-icons/im';
import { HiOutlinePaperClip } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';

import './costomMessageInput.css';

const CustomMessageInput = ({ placeholder, onChangeHandler, onSend, value }) => {
    return (
        <form onSubmit={onSend}>
            <div className="messageContainer">
                <input className="messageInput" placeholder={placeholder} value={value} onChange={onChangeHandler} />
                <div className="messageInputIcons">
                    <ImSmile2 className="messageInputIcon" />
                    <HiOutlinePaperClip className="messageInputIcon" />
                    <button type="submit" className={Boolean(value.trim()) ? "sendMessage" : "sendMessageDisabled"}>
                        <RiSendPlaneFill />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CustomMessageInput;
