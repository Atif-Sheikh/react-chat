import firebase from 'firebase/app';
import { getPath } from './message';


export const sendTyping = (currentUser, chatID) => {
    const path = getPath(currentUser, chatID);
    return firebase.database().ref(`/chatTypings/${path}/${currentUser.name}`).set({ name: currentUser.name });
}

export const removeTyping = (currentUser, chatID) => {
    const path = getPath(currentUser, chatID);
    return firebase.database().ref(`/chatTypings/${path}/${currentUser.name}`).remove();
};



export const typingStop = (path) => {
    return firebase.database().ref(path).remove();
};