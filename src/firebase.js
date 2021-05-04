import firebase from "firebase/app";

import 'firebaseui/dist/firebaseui.css';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDbqF2-5PGHJU2Deqg_kHfuhhQnTVus-EE",
    authDomain: "todo-app-database-bd16f.firebaseapp.com",
    databaseURL: "https://todo-app-database-bd16f.firebaseio.com",
    projectId: "todo-app-database-bd16f",
    storageBucket: "todo-app-database-bd16f.appspot.com",
    messagingSenderId: "312069326930",
    appId: "1:312069326930:web:c31bc1c806bbd5b721b78b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);