const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendChatNotification = functions.https.onRequest((req, res) => {
    if(req.body.deviceToken){
        let payload = {
            data: {
                priority: 'high'
            },
            notification: {
                title: req.body.title,
                body: req.body.body,
                sound: 'default',
                icon: 'default',
            }
        };
        res.send('success');
        return admin.messaging().sendToDevice(req.body.deviceToken, payload);
    }
});