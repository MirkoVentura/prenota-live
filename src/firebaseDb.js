import firebase from 'firebase/app'
// Required for side-effects
require("firebase/firestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfnI_GUqIjhoLSHP3sydb2BAPTrmJypZU",
    authDomain: "camachristmas.firebaseapp.com",
    databaseURL: "https://camachristmas.firebaseio.com",
    projectId: "camachristmas",
    storageBucket: "camachristmas.appspot.com",
    messagingSenderId: "220001688077",
    appId: "1:220001688077:web:c8d08bf84c6b91925c5344",
    measurementId: "G-XKW2N3YB8R"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
