import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';





export const closeDiscussion = (roomID, topic) => {
    return FirebaseService.getOnceFromDatabase(`/groupMessages/${roomID}/${topic}/`);
}

export const roomDiscussion = (roomID, topic) => {
    return firebase.database().ref(`/groupMessages/${roomID}/${topic}/`).update({ closed: true });
}


export const closeRoom = (roomID, topic) => {
    return firebase.database().ref(`/groupMessages/${roomID}/${topic}/`).update({ closed: true });
};
