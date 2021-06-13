import firebase from 'firebase/app';
import { store } from '../index';
import appConstants from '../config/appConstants';


export const getPath = (currentUser, chatID) => {
    let path = currentUser.uid + chatID;
    path = path.split('').sort().join('');
    return path;
}


export const getMessages = (currentUser, chatID) => {
    const path = getPath(currentUser, chatID);
    firebase.database().ref(`/chatMessages/${path}`).orderByChild('time').on("value", (snapshot) => {
        store.dispatch({ type: "CHAT_MESSAGES", payload: snapshot.val() })
    });
}


export const sendMessage = (currentUser, chatID, msg, user) => {
    const path = getPath(currentUser, chatID);
    const data = {
        msg,
        senderId: currentUser.uid,
        name: user?.name,
        img: user?.img,
        reciverId: chatID,
        time: Date.now(),
    }
    if(!data.img){
        data.img = appConstants.iconUrl;
    }
    return firebase.database().ref(`/chatMessages/${path}`).push(data);
}

export const changeMessage = (path, data) => {
    return firebase.database().ref(path).set(data);
}
