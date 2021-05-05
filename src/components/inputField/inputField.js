import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";

import './inputField.css';

const InputField = ({label, onChangeHandler, value}) => (
    <FormControl>
        <FormLabel className="formLabel">{label}</FormLabel>
        <Input onChange={onChangeHandler} value={value} className="textField" placeholder="" />
    </FormControl>
);

export default InputField;
