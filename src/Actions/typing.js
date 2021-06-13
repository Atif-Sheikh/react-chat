import firebase from 'firebase/app';


export const sendTyping = (path, data) => {
    return firebase.database().ref(path).set(data);
} 

export const removeTyping = path => {
    return firebase.database().ref(path).remove();
};



export const typingStop = (path) => {
    return firebase.database().ref(path).remove();
};