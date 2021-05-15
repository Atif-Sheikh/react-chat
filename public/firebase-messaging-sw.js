// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDbqF2-5PGHJU2Deqg_kHfuhhQnTVus-EE",
    authDomain: "todo-app-database-bd16f.firebaseapp.com",
    databaseURL: "https://todo-app-database-bd16f.firebaseio.com",
    projectId: "todo-app-database-bd16f",
    storageBucket: "todo-app-database-bd16f.appspot.com",
    messagingSenderId: "312069326930",
    appId: "1:312069326930:web:c31bc1c806bbd5b721b78b"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});