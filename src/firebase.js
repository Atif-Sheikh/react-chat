import firebase from "firebase/app";

import 'firebase/firebase-messaging';

import 'firebaseui/dist/firebaseui.css';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJZTg836icDkNtCM6IbDIuddVAODXXTkc",
  authDomain: "fiverr-staging.firebaseapp.com",
  databaseURL: "https://fiverr-staging-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fiverr-staging",
  storageBucket: "fiverr-staging.appspot.com",
  messagingSenderId: "1006147227397",
  appId: "1:1006147227397:web:895c0a78649e5b3347f16c"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const messaging = firebase.messaging();

export const getToken = () => {
  return messaging.getToken({ vapidKey: "BH-d1dBRtZ9G2T7pw95HcY7IxahazJRF7c9q99lqyfpEEdear-PIjj4asNiRwp-oebLeiamYahl-jP4dfeq2RHY" });
};
