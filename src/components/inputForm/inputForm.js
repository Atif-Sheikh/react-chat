import React, { useState } from 'react';
import {
    Stack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import InputField from '../inputField/inputField';
import './inputForm.css';

const InputForm = ({ type, onClickBtn, isLoading = false }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        type === 'signup' ? onClickBtn({ name, email, password }) : onClickBtn({ name, email, password });
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleClick}>
                <Stack spacing={3}>
                    {type === 'signup' && <InputField value={name} onChangeHandler={({ target: { value } }) => setName(value)} label="First name" />}
                    <InputField value={email} onChangeHandler={({ target: { value } }) => setEmail(value)} label="Email" />
                    <InputField value={password} onChangeHandler={({ target: { value } }) => setPassword(value)} label="Password" type="password" />
                    <Button isLoading={isLoading} type='submit' className="createAccount" colorScheme="blue">{type === 'signup' ? "Create my account" : "Login"}</Button>
                </Stack>
            </form>
        </div>
    )
}

export default InputForm;
