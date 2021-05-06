import React from 'react';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import './phoneInput.css';

const PhoneNumberField = ({ value, onChange, disabled }) => {
    return (
        <PhoneInput
            inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
            }}
            country={'us'}
            disabled={disabled}
            value={value}
            placeholder="Enter Phone Number"
            onChange={onChange}
            inputStyle={{ width: '100%', height: 40 }}
            enableSearch
            disableSearchIcon
        />
    )
}

export default PhoneNumberField;
