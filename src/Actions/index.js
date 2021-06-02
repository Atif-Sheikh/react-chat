import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';
import {store} from '../index';

export const getMessages = (path) => {
        firebase.database().ref(path).orderByChild('time').on("value", (snapshot) => {
            store.dispatch({type: "CHAT_MESSAGES", payload: snapshot.val() })
        });
}

export const sendTyping = (path, data) => {
    return firebase.database().ref(path).set(data);
} 

export const removeTyping = path => {
    return firebase.database().ref(path).remove();
};


export const sendMessage = (path, data) => {
    return firebase.database().ref(path).push(data);
}

export const getUser = async (path) => {
    let user = await FirebaseService.getOnceFromDatabase(path)
    store.dispatch({type: "GET_USER", payload: user.val() })
}

export const getGroupMessages = (path) => {
    firebase.database().ref(path).orderByChild('time').on("value", (snapshot) => {
        store.dispatch({type: "GROUP_MESSAGES", payload: snapshot.val() })
    });
}

export const changeMessage = (path, data) => {
    return firebase.database().ref(path).set(data);
}

export const typingStop = (path) => {
    return firebase.database().ref(path).remove();
};

export const tokenToGroup = (path, data) => {
    return firebase.database().ref(path).update(data);
};

export const joinGroupAction = (path, data) => {
    return firebase.database().ref(path).set(data)
};

export const groupEntry = (path) => {
    return FirebaseService.getOnceFromDatabase(path);
};

export const leaveGroup = (path) => {
    return firebase.database().ref(path).remove();
};

export const sendGroupMessageAction = (path, data) => {
    return firebase.database().ref(path).push(data);
}

export const closeDiscussion = (path) => {
    return FirebaseService.getOnceFromDatabase(path);
}

export const roomDiscussion = (path, data) => {
    return firebase.database().ref(path).update(data);
}