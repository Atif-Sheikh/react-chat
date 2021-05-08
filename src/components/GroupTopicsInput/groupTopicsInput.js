import React from 'react';
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import './groupTopicsInput.css';

const GroupTopicsInput = ({ topics, handleChange, currentTopic, handleChangeInput }) => {
    return (
        <>
            <div className="topicsLabel">Topics</div>
            <TagsInput
                className="react-tags-input"
                value={topics}
                onChange={handleChangeInput}
                inputValue={currentTopic}
                onChangeInput={handleChange}
                inputProps={{
                    placeHolder: ''
                }}
            />
        </>
    );
};

export default GroupTopicsInput;
