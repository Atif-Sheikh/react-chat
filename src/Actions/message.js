import firebase from 'firebase/app';
import {store} from '../index';



export const getMessages = (path) => {
    firebase.database().ref(path).orderByChild('time').on("value", (snapshot) => {
        store.dispatch({type: "CHAT_MESSAGES", payload: snapshot.val() })
    });
}


export const sendMessage = (path, data) => {
    return firebase.database().ref(path).push(data);
}

export const changeMessage = (path, data) => {
    return firebase.database().ref(path).set(data);
}
