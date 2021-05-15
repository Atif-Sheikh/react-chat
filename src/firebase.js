import firebase from "firebase/app";

import 'firebase/firebase-messaging';

import 'firebaseui/dist/firebaseui.css';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBD4bl4qFnVlD6QUOC8X62O3jYuAs4xjMI",
  authDomain: "performr-714dc.firebaseapp.com",
  databaseURL: "https://performr-714dc.firebaseio.com",
  projectId: "performr-714dc",
  storageBucket: "performr-714dc.appspot.com",
  messagingSenderId: "642424147026",
  appId: "1:642424147026:web:4057c8547568603325a38b",
  measurementId: "G-THKN7X6PLL"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const messaging = firebase.messaging();

export const getToken = () => {
  return messaging.getToken({ vapidKey: "BGOV77vDPuhuyBi4keGCxfDVczA8razY4nILlcjZziKbvc7bYFKWxcEXtU1uL2tly2b_37OU5vQabpYTkfOK0ws" });
};
