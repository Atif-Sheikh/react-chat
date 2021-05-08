import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './searchField.css';

const SearchField = () => {
    return (
        <div className="customSearchField">
            <input type="text" />
            <AiOutlineSearch />
        </div>
    );
};

export default SearchField;
