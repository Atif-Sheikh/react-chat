import firebase from "firebase/app";

export default class FirebaseService {

    static getUser(ref) {
        return firebase.database().ref(ref).once('value');
    }
    static setOnDatabase(ref, payload) {
        return firebase.database().ref(ref).set(payload)
    }
    static pushOnDatabase(ref, payload) {
        return firebase.database().ref(ref).push(payload)
    }
    static getOnceFromDatabase(ref) {
        return firebase.database().ref(ref).once("value", (snapshot) => snapshot)
    }
    static updateOnDatabase(ref, payload) {
        return firebase.database().ref(ref).update(payload)
    }
    static removeFromDatabase(ref) {
        return firebase.database().ref(ref).remove();
    }
    static listenOnDatabase(ref, callBack = () => {}, orderBy) {
        firebase.database().ref(ref).orderByChild(orderBy).on("value", (snapshot) => {
            console.log(snapshot.val(), "::::")
            callBack(snapshot.val());
        });
    }
    static listenOnDatabaseWithoutOrder(ref, callBack = () => {}) {
        firebase.database().ref(ref).on("value", (snapshot) => {
            callBack(snapshot.val());
        });
    }
    static logoutuser() {
        return firebase.auth().signOut()
    }
}