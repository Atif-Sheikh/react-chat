import React from 'react';

import './emptyContainer.css';

const EmptyContainer = ({ children }) => {
    
    return (
        <div className="chatContainer">
            {children}
        </div>
    )
}

export default EmptyContainer;
