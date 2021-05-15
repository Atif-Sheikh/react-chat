// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBD4bl4qFnVlD6QUOC8X62O3jYuAs4xjMI",
    authDomain: "performr-714dc.firebaseapp.com",
    databaseURL: "https://performr-714dc.firebaseio.com",
    projectId: "performr-714dc",
    storageBucket: "performr-714dc.appspot.com",
    messagingSenderId: "642424147026",
    appId: "1:642424147026:web:4057c8547568603325a38b",
    measurementId: "G-THKN7X6PLL"
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