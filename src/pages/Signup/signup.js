import React, { useState, useEffect } from 'react';

import { AiTwotonePhone } from 'react-icons/ai';
import { Divider } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import { FcGoogle } from 'react-icons/fc';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    PinInput,
    PinInputField,
    HStack,
    useToast,
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';

import SocialBtn from '../../components/socialBtn/socialBtn';
import SignupForm from '../../components/inputForm/inputForm';
import { googleLogin, phoneLogin } from '../../Utils/authUtils';

import './signup.css';

const Signup = ({history}) => {
    const [verifier, setVerifier] = useState(null);
    const [phoneModal, setPhoneModal] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [OTPloading, setOTPloading] = useState(false);
    const [number, setNumber] = useState('');
    const [otpConfirm, setOTPConfirm] = useState(null);
    const dispatch = useDispatch();

    const toast = useToast();
    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    const handleGoogleSignup = async () => {
        try {
            let result = await googleLogin()

            var user = {
                isNewUser: result.additionalUserInfo.isNewUser,
                ...result.additionalUserInfo.profile,
                ...result.user,
            };

            if(result.additionalUserInfo.isNewUser){
                firebase.database().ref(`/users/${result.user.uid}`).set({
                    name: result.user.displayName,
                    email: result.user.email,
                    uid: result.user.uid,
                    img: result.user.photoURL, 
                });
            }

            dispatch({ type: "UPDATE_USER", payload: user });
            history.push('/dashboard');

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const _verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container-signup", {
            size: "invisible",
        });
        if (!verifier) {
            _verifier.verify().then(() => {
                setVerifier(_verifier)
            });
        }
        return () => {
            _verifier.clear();
        }
    }, []);

    const handleOnClick = () => {
        history.push('/dashboard');
    };

    const handlePhoneLogin = async () => {
        try {
            if (!number.trim()) return;

            setOTPloading(true);
            let result = await phoneLogin(`+${number}`, verifier);

            setOTPloading(false);
            setShowOtp(true);
            setOTPConfirm(result);
        } catch (err) {
            setOTPloading(false);
            toast({
                title: err?.code,
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleOTP = async (otpNumber) => {
        try {
            let result = await otpConfirm
                .confirm(otpNumber);

            if(result?.user) {

            }
        } catch (err) {
            toast({
                title: err?.code,
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleModalClose = () => {
        setPhoneModal(false);
        setOTPloading(false);
        setOTPConfirm(false);
        setNumber('');
    };

    function PhoneNumberModal() {
        return (
            <Modal isOpen={phoneModal} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Phone number verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input value={number} disabled={showOtp} onChange={({ target: { value } }) => setNumber(value)} type="number" placeholder="Enter Phone Number" />
                        <Button onClick={handlePhoneLogin} width="100%" mt={5} isLoading={OTPloading} colorScheme="blue">Send OTP</Button>

                        {
                            showOtp ?
                                <HStack marginTop={5} justifyContent="center" className="OPTFieldContainer">
                                    <PinInput onComplete={handleOTP} otp>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                                :
                                null
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleModalClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };


    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="getStarted">
                    Enter your info to get started
                </h2>

                <SocialBtn onPress={handleGoogleSignup} Icon={FcGoogle} title="Sign up with Google" iconStyle={iconStyles} />
                <SocialBtn onPress={() => setPhoneModal(true)} Icon={AiTwotonePhone} title="Sign up with Phone" iconStyle={iconStyles} />

                <div className="dividerContainer">
                    <Divider className="horDivider" orientation="horizontal" />
                    <span>OR</span>
                    <Divider className="horDivider" orientation="horizontal" />
                </div>

                <SignupForm onClickBtn={handleOnClick} type="signup" />

            </div>
            <div className="alreadyAccount">
                <span>Already have an account? </span>
                <Link to="/login">
                    <span className="loginToChakra">Log in</span>
                </Link>
            </div>
            <div id="recaptcha-container-signup" />
            {phoneModal && PhoneNumberModal()}
        </div>
    )
}

export default Signup;
