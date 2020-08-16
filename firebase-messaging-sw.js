// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

// self.addEventListener("notificationclick", function(event) {
//   console.log('notification open');
//   clients.openWindow('http://peca.live');
//   // log send to server
// });

// self.onnotificationclick = function(event) {
//   console.log('On notification click: ', event.notification.tag);
//   event.notification.close();
//
//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(clients.matchAll({
//     type: "window"
//   }).then(function(clientList) {
//     for (var i = 0; i < clientList.length; i++) {
//       var client = clientList[i];
//       if (client.url == '/' && 'focus' in client)
//         return client.focus();
//     }
//     if (clients.openWindow)
//       return clients.openWindow('/');
//   }));
// };

// self.addEventListener('onnotificationclick', function(event) {
//   event.notification.close();
//
//   var promise = new Promise(function(resolve) {
//     setTimeout(resolve, 1000);
//   }).then(function() {
//     return clients.openWindow('http://peca.live');
//     // return clients.openWindow(event.data.locator);
//   });
//
//   event.waitUntil(promise);
// });


importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA7eYUQGSJIsLaBePdMFWG3OWzVTfkic1I",
  authDomain: "peca-live.firebaseapp.com",
  databaseURL: "https://peca-live.firebaseio.com",
  projectId: "peca-live",
  storageBucket: "peca-live.appspot.com",
  messagingSenderId: "759961842358",
  appId: "1:759961842358:web:d0a0fbbf9be60fd9c72c17",
  measurementId: "G-G1XZ8N5NP2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'api-key',
   authDomain: 'project-id.firebaseapp.com',
   databaseURL: 'https://project-id.firebaseio.com',
   projectId: 'project-id',
   storageBucket: 'project-id.appspot.com',
   messagingSenderId: 'sender-id',
   appId: 'app-id',
   measurementId: 'G-measurement-id',
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// self.addEventListener('onnotificationclick', function(event) {
//   event.notification.close();
//
//   var promise = new Promise(function(resolve) {
//     setTimeout(resolve, 1000);
//   }).then(function() {
//     return clients.openWindow('http://peca.live');
//     // return clients.openWindow(event.data.locator);
//   });
//
//   event.waitUntil(promise);
// });
//
// // If you would like to customize notifications that are received in the
// // background (Web app is closed or not in browser focus) then you should
// // implement this optional method.
// // [START background_handler]
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     actions: [{action: 'http://peca.live/', title: 'test-title'}],
//     body: payload.data.body,
//     icon: payload.data.icon, // Push通知メッセージのアイコン
//     badge: payload.data.badge, // スマホヘッダーのバッジ
//     vibrate: [300, 10, 100, 10, 100],
//     requireInteraction: true // タップするまで通知をずっと表示
//   };
//
//   // // クリックしたら、URLに遷移
//   // self.registration.addEventListener('notificationclick', event => {
//   //   // event.notification.close();
//   //   // event.waitUntil(self.clients.openWindow(payload.data.url));
//   //   event.waitUntil(self.clients.openWindow('https://peca-live.netlify.app/'));
//   // });
//
//   // self.onnotificationclick = function(event) {
//   //   console.log('On notification click: ', event.notification.tag);
//   //   event.notification.close();
//   //
//   //   // This looks to see if the current is already open and
//   //   // focuses if it is
//   //   event.waitUntil(clients.matchAll({
//   //     type: "window"
//   //   }).then(function(clientList) {
//   //     for (var i = 0; i < clientList.length; i++) {
//   //       var client = clientList[i];
//   //       if (client.url == '/' && 'focus' in client)
//   //         return client.focus();
//   //     }
//   //     if (clients.openWindow)
//   //       return clients.openWindow('http://peca.live');
//   //   }));
//   // };
//
//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });
// // [END background_handler]



self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  var data = {};
  if (event.data) {
    data = event.data.json().data;
  }

  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon, // Push通知メッセージのアイコン
    badge: data.badge, // スマホヘッダーのバッジ
    data: { url: data.url },
    vibrate: [300, 10, 100, 10, 100],
    requireInteraction: true // タップするまで通知をずっと表示
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  console.log(`[Service Worker] event.notification.data: "${event.notification.data}"`);
  console.log(`[Service Worker] event.notification.data.url: "${event.notification.data.url}"`);
  console.log(`[Service Worker] event.data: "${event.data}"`);

  // var data = {};
  // if (event.data) {
  //   data = event.data.json().data;
  // }

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
