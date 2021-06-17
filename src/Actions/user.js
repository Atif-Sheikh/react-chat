import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';
import {store} from '../index';


export const getUser = async (chatID) => {
    let user = await FirebaseService.getOnceFromDatabase(`/users/${chatID}`)
    store.dispatch({type: "GET_USER", payload: user.val() })
}


export const userDetailsById = (id) => {
    return FirebaseService.getOnceFromDatabase(`/users/${id}`)
}

export const userList = async () => {
    const currentUser = await firebase.auth().currentUser;
    const dbUsers = await FirebaseService.getOnceFromDatabase('/users');

    return dbUsers.val() ? Object.values(dbUsers.val()).map(usr => ({ name: usr.name, uid: usr?.uid, status: usr.status || 'unavailable', img: usr.img || '' })).filter(usr => usr?.uid !== currentUser?.uid) : [];            
};


export const logOut = () => {
    return firebase.auth().signOut();
};