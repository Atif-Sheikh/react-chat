import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiTwotonePhone } from 'react-icons/ai';
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
} from "@chakra-ui/react"

import InputForm from '../../components/inputForm/inputForm';
import SocialBtn from '../../components/socialBtn/socialBtn';
import { googleLogin, phoneLogin } from '../../Utils/authUtils';

const Login = () => {
    const [verifier, setVerifier] = useState(null);
    const [phoneModal, setPhoneModal] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [OTPloading, setOTPloading] = useState(false);
    const [number, setNumber] = useState('');
    const [otpConfirm, setOTPConfirm] = useState(null);

    const toast = useToast();

    let iconStyles = { color: "#6482c0", fontSize: "1.5em" };

    const handleGoogleLogin = async () => {
        try {
            let result = await googleLogin()
            console.log(result, ">>>><>><")
            // var credential = result.credential;

            // var token = credential.accessToken;
            // The signed-in user info.
            // var user = result.user;

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

    useEffect(() => {
        const _verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
            size: "invisible",
        });
        if (!verifier) {
            _verifier.verify().then(() => {
                console.log(_verifier, "YEEE")
                setVerifier(_verifier)
            });
        }
        return () => {
            // _verifier.clear();
        }
    }, []);

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

                <SocialBtn id="login-button" onPress={handleGoogleLogin} Icon={FcGoogle} title="Login with Google" iconStyle={iconStyles} />
                <SocialBtn onPress={() => setPhoneModal(true)} Icon={AiTwotonePhone} title="Login with Phone" iconStyle={iconStyles} />

                <InputForm type="login" />
            </div>
            <div className="alreadyAccount">
                <span>Don't have an account?</span>
                <Link to="/">
                    <span className="loginToChakra">Signup</span>
                </Link>
            </div>
            <div id="recaptcha-container" />
            {phoneModal && PhoneNumberModal()}
        </div>
    )
}

export default Login;
