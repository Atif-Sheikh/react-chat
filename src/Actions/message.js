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
        let msgs = snapshot.val() ? Object.values(snapshot.val()).map(msg => ({
            message: msg.msg,
            sentTime: "15 mins ago",
            sender: currentUser.uid,
            direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
            position: currentUser.uid === msg.senderId ? "last" : "single",
            img: msg.img,
        })) : [];
        store.dispatch({ type: "CHAT_MESSAGES", payload: msgs });
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
        data.img = appConstants.defaultImage;
    }
    return firebase.database().ref(`/chatMessages/${path}`).push(data);
}

export const changeMessage = (roomID, topic, currentUser) => {
    return firebase.database().ref(`/chatTypings/${roomID}/${topic}/${currentUser.name}`).set({
        name: currentUser.name
    });
}
