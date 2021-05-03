import React from 'react';
import {
    Stack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import InputField from '../inputField/inputField';
import './inputForm.css';

const InputForm = ({ type }) => {
    return (
        <div className="formContainer">
            <Stack spacing={3}>
                {type === 'signup' && <InputField label="First name" />}
                <InputField label="Email" />
                <InputField label="Password" />
                <Button className="createAccount" colorScheme="blue">{type === 'signup' ? "Create my account" : "Login"}</Button>
            </Stack>
        </div>
    )
}

export default InputForm;
