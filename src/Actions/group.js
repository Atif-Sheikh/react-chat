import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';
import { store } from '../index';
import { v4 as uuidv4 } from 'uuid';


export const getGroupMessages = (path) => {
    firebase.database().ref(path).orderByChild('time').on("value", (snapshot) => {
        store.dispatch({ type: "GROUP_MESSAGES", payload: snapshot.val() })
    });
}

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

export const groupTopic = (path) => {
    return FirebaseService.getOnceFromDatabase(path)
}

export const groupRoomEntry = (path) => {
    return FirebaseService.getOnceFromDatabase(path)
}

export const joinGroupRoom = (path, data) => {
    return firebase.database().ref(path).set(data)
};

export const leaveGroupAction = (path) => {
    return FirebaseService.removeFromDatabase(path)
};

export const groupDetail = (path) => {
    return FirebaseService.getOnceFromDatabase(path)
};

export const setGroupData = (path, data) => {
    return firebase.database().ref(path).set(data)
};

export const groupListAction = () => {
    FirebaseService.listenOnDatabaseWithoutOrder('/groups', (data) => store.dispatch({ type: "ALL_GROUPS", payload: data }));
};

export const createGroup = async (groupName, topics, currentUser) => {
    let groupId = uuidv4();
    await setGroupData(`/groups/${groupId}`, {
        groupName: groupName.trim(),
        topics,
        creatorID: currentUser.uid,
        creatorName: currentUser.displayName || 'New User',
        groupId: groupId,
    });
    await setGroupData(`/groups/${groupId}/members/${currentUser.uid}`, {
        memberName: currentUser.displayName || 'New User',
        uid: currentUser.uid,
        img: currentUser?.img,
    });
}