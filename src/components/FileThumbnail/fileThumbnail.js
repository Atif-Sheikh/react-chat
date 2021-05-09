import React from 'react';

import './fileThumbnail.css';

const FileThumbnail = ({ Icon, title, count, color, textColor }) => {
    return (
        <div className="fileThumbnailContainer" style={{ backgroundColor: color }}>
            {Icon}
            <div>
                <div className="fileNameCount" style={{color: textColor }}>{title}</div>
                <div className="fileCount" style={{color: textColor }}>{count}</div>
            </div>
        </div>
    );
};

export default FileThumbnail;
