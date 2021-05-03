import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Divider } from "@chakra-ui/react"

import SocialBtn from '../../components/socialBtn/socialBtn';
import LoginForm from '../../components/loginForm/loginForm';

import './login.css';

const Login = () => {
    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>

                <SocialBtn Icon={FcGoogle} title="Sign up with Google" iconStyle={iconStyles} />
                <SocialBtn Icon={FaFacebook} title="Sign up with Facebook" iconStyle={iconStyles} />

                <div className="dividerContainer">
                    <Divider className="horDivider" orientation="horizontal" />
                    <span>OR</span>
                    <Divider className="horDivider" orientation="horizontal" />
                </div>

                <LoginForm />
            </div>
        </div>
    )
}

export default Login;
