import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";

import './inputField.css';

const InputField = ({label}) => (
    <FormControl>
        <FormLabel className="formLabel">{label}</FormLabel>
        <Input className="textField" placeholder="" />
    </FormControl>
);

export default InputField;
