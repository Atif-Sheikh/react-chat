import firebase from "firebase/app";
import 'firebase/auth';

export const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return firebase.auth()
        .signInWithPopup(provider);
};

export const phoneLogin = (number, appVerifier) => {
    const _appVerifier = appVerifier;
    return firebase.auth().signInWithPhoneNumber(number, _appVerifier);
};
