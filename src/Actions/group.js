import firebase from 'firebase/app';
import FirebaseService from 'Utils/firebaseService';
import { store } from '../index';
import { v4 as uuidv4 } from 'uuid';
import appConstants from '../config/appConstants';


export const getGroupMessages = async (roomID, topic) => {
    const currentUser = await firebase.auth().currentUser;
    firebase.database().ref(`/groupMessages/${roomID}/${topic}/messages`).orderByChild('time').on("value", (snapshot) => {
        let dbMsgs = snapshot.val() ? Object.values(snapshot.val()).map(msg => ({
            message: msg.msg,
            sentTime: "15 mins ago",
            sender: msg.senderId,
            direction: currentUser.uid === msg.senderId ? "outgoing" : "incoming",
            position: currentUser.uid === msg.senderId ? "last" : "single",
            img: msg.img,
        })) : [];
        store.dispatch({ type: "GROUP_MESSAGES", payload: dbMsgs })
    });
}

export const tokenToGroup = (roomID, currentUser, token) => {
    return firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).update({
        deviceToken: token,
    });
};

export const joinGroupAction = (roomID, currentUser) => {
    return firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).set({
        memberName: currentUser.name || 'New User',
        uid: currentUser.uid,
        img: currentUser?.img,
    })
};

export const groupEntry = async (roomID) => {
    const currentUser = await firebase.auth().currentUser;
    const dbData = await FirebaseService.getOnceFromDatabase(`/groups/${roomID}`);
    let memberIDs = dbData.val() ? Object.keys(dbData.val().members) : [];
    
    store.dispatch({ type: "GROUP_ENTRY", payload: {[roomID]: Boolean(memberIDs.includes(currentUser?.uid))} });
};

export const leaveGroup = (roomID, currentUser) => {
    return firebase.database().ref(`groups/${roomID}/members/${currentUser?.uid}`).remove();
};

export const sendGroupMessageAction = (roomID, topic, currentUser, msg) => {
    const data = {
        msg,
        senderId: currentUser.uid,
        name: currentUser?.name,
        img: currentUser.img || appConstants.defaultImage,
        time: Date.now(),
    }
    return firebase.database().ref(`/groupMessages/${roomID}/${topic}/messages`).push(data);
}

export const groupTopic = (roomID) => {
    return FirebaseService.getOnceFromDatabase(`/groups/${roomID}`)
}

export const groupRoomEntry = (roomID) => {
    return FirebaseService.getOnceFromDatabase(`/groups/${roomID}`)
}

export const joinGroupRoom = (roomID, currentUser) => {
    const data = {
        memberName: currentUser?.name || 'New User',
        uid: currentUser?.uid,
        img: currentUser?.img,
    }
    return firebase.database().ref(`groups/${roomID}/members/${currentUser.uid}`).set(data)
};

export const leaveGroupAction = (roomID, currentUser) => {
    return FirebaseService.removeFromDatabase(`groups/${roomID}/members/${currentUser.uid}`)
};

export const groupDetail = (roomID) => {
    return FirebaseService.getOnceFromDatabase(`/groups/${roomID}`)
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

export const getGroupMessagesTopic = (roomID, topic) => {
    return FirebaseService.getOnceFromDatabase(`/groupMessages/${roomID}/${topic}`);
}