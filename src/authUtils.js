import firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import 'firebase/auth';

export const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return firebase.auth()
        .signInWithPopup(provider);
};

export const phoneLogin = (number) => {
    const appVerifier = window.appVerifier;
    return firebase.auth().signInWithPhoneNumber(number, appVerifier);
};
