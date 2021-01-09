import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBXLH0mwP6GQdIw2HhYrzRg4M6PZ0FK7gM",
    authDomain: "shalom-adv-app.firebaseapp.com",
    projectId: "shalom-adv-app",
    storageBucket: "shalom-adv-app.appspot.com",
    messagingSenderId: "992442816575",
    appId: "1:992442816575:web:f796f8b2bed9bf9109808a"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();