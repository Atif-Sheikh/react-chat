import React from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../components/inputForm/inputForm';

const Login = () => {
    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>
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
