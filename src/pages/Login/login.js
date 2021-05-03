import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiTwotonePhone } from 'react-icons/ai';
import firebase from "firebase/app";
import { FcGoogle } from 'react-icons/fc';

import InputForm from '../../components/inputForm/inputForm';
import SocialBtn from '../../components/socialBtn/socialBtn';
import { googleLogin, phoneLogin } from '../../authUtils';

const Login = () => {
    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    const handleGoogleLogin = async () => {
        try {
            let result = await googleLogin()
            console.log(result, ">>>><>><")
            var credential = result.credential;

            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

        } catch (err) {
            console.error(err);
        }
    };

    const handlePhoneLogin = async () => {
        try {
            window.appVerifier = new firebase.auth.RecaptchaVerifier(
                "recaptcha-container",
                {
                  size: "invisible"
                 }
              );
            let result = await phoneLogin('+923002410353');
            console.log(result, "<<>>>")
        }catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>

                <SocialBtn id="login-button" onPress={handleGoogleLogin} Icon={FcGoogle} title="Login with Google" iconStyle={iconStyles} />
                <SocialBtn onPress={handlePhoneLogin} Icon={AiTwotonePhone} title="Login with Phone" iconStyle={iconStyles} />

                <InputForm type="login" />
            </div>
            <div className="alreadyAccount">
                <span>Don't have an account?</span>
                <Link to="/">
                    <span className="loginToChakra">Signup</span>
                </Link>
            </div>
            <div id="recaptcha-container" />
        </div>
    )
}

export default Login;
