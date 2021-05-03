import React from 'react';

import { AiTwotonePhone } from 'react-icons/ai';
import { Divider } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import SocialBtn from '../../components/socialBtn/socialBtn';
import SignupForm from '../../components/inputForm/inputForm';
import { googleLogin } from '../../authUtils';

import './signup.css';

const Login = () => {
    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    const handleGoogleSignup = async () => {
        try {
            let result = await googleLogin()
            console.log(result, ">>>><>><")
            // var credential = result.credential;

            // var token = credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>

                <SocialBtn onPress={handleGoogleSignup} Icon={FcGoogle} title="Sign up with Google" iconStyle={iconStyles} />
                <SocialBtn Icon={AiTwotonePhone} title="Sign up with Phone" iconStyle={iconStyles} />

                <div className="dividerContainer">
                    <Divider className="horDivider" orientation="horizontal" />
                    <span>OR</span>
                    <Divider className="horDivider" orientation="horizontal" />
                </div>

                <SignupForm type="signup" />

            </div>
            <div className="alreadyAccount">
                <span>Already have an account? </span>
                <Link to="/login">
                    <span className="loginToChakra">Log in</span>
                </Link>
            </div>
        </div>
    )
}

export default Login;
