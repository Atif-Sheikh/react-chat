import React from 'react';

import './listContainer.css';

const ListContainer = ({ children }) => {
    return (
        <div className="ulContainer">
            {children}
        </div>
    )
}

export default ListContainer;
