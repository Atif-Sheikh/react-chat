import React from 'react';
import {
    Stack,
  } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import InputField from '../inputField/inputField';
import './loginForm.css';

const LoginForm = () => {
    return (
        <div className="formContainer">
            <Stack spacing={3}>
                <InputField label="First name" />
                <InputField label="Email" />
                <InputField label="Password" />
                <Button className="createAccount" colorScheme="blue">Create my account</Button>
            </Stack>
        </div>
    )
}

export default LoginForm;
