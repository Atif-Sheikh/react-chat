import React from 'react';
import { Link } from 'react-router-dom';
import { AiTwotonePhone } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import InputForm from '../../components/inputForm/inputForm';
import SocialBtn from '../../components/socialBtn/socialBtn';

const Login = () => {
    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>

                <SocialBtn Icon={FcGoogle} title="Login with Google" iconStyle={iconStyles} />
                <SocialBtn Icon={AiTwotonePhone} title="Login with Phone" iconStyle={iconStyles} />
                
                <InputForm type="login" />
            </div>
            <div className="alreadyAccount">
                <span>Don't have an account?</span>
                <Link to="/">
                    <span className="loginToChakra">Signup</span>
                </Link>
            </div>
        </div>
    )
}

export default Login;
