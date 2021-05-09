import React from 'react';

import './fileThumbnail.css';

const FileThumbnail = ({ Icon, title, count, color, textColor }) => {
    return (
        <div className="fileThumbnailContainer" style={{ backgroundColor: color }}>
            {Icon}
            <div className="fileNameCount">
                <span className="fileName" style={{color: textColor }}>{title}</span>
                <span className="fileCount" style={{color: textColor }}>{count}</span>
            </div>
        </div>
    );
};

export default FileThumbnail;
