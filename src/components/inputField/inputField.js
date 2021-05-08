import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

import './inputField.css';

const InputField = ({ label, onChangeHandler, value, type = "text", labelClass = 'formLabel', textFieldClass = 'textField' }) => (
    <FormControl>
        <FormLabel className={labelClass}>{label}</FormLabel>
        <Input type={type} onChange={onChangeHandler} value={value} className={textFieldClass} placeholder="" />
    </FormControl>
);

export default InputField;
