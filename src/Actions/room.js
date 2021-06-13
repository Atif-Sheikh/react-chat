import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';





export const closeDiscussion = (path) => {
    return FirebaseService.getOnceFromDatabase(path);
}

export const roomDiscussion = (path, data) => {
    return firebase.database().ref(path).update(data);
}


export const closeRoom = (path) => {
    return firebase.database().ref(path)
};
