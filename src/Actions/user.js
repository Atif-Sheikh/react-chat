import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';
import {store} from '../index';


export const getUser = async (chatID) => {
    let user = await FirebaseService.getOnceFromDatabase(`/users/${chatID}`)
    store.dispatch({type: "GET_USER", payload: user.val() })
}


export const userDetailsById = (path) => {
    return FirebaseService.getOnceFromDatabase(path)
}

export const userList = (path) => {
    return FirebaseService.getOnceFromDatabase(path)
};


export const logOut = () => {
    return firebase.auth().signOut();
};