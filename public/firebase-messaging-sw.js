// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCJZTg836icDkNtCM6IbDIuddVAODXXTkc",
    authDomain: "fiverr-staging.firebaseapp.com",
    databaseURL: "https://fiverr-staging-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fiverr-staging",
    storageBucket: "fiverr-staging.appspot.com",
    messagingSenderId: "1006147227397",
    appId: "1:1006147227397:web:895c0a78649e5b3347f16c"
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