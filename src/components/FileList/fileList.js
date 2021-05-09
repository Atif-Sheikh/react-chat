import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

import './fileList.css';

const FileList = ({ Icon, title, description, fileBackground }) => {
    return (
        <div className="fileListContainer">
            <div className="fileIcon" style={{ backgroundColor: fileBackground }}>
                {Icon}
            </div>
            <div className="titleDescription">
                <p className="fileName">{title}</p>
                <p className="fileDetails">{description}</p>
            </div>
            <div>
                <BiChevronRight color="#ABB1B8" />
            </div>
        </div>
    )
}

export default FileList;
