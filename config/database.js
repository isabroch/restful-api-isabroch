const firebase = require("firebase");
const firestore = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAeUatxasTi9KSdKDY053iwT4nsaSS9BCI",
  authDomain: "briansostebutik-izzy.firebaseapp.com",
  databaseURL: "https://briansostebutik-izzy.firebaseio.com",
  projectId: "briansostebutik-izzy",
  storageBucket: "briansostebutik-izzy.appspot.com",
  messagingSenderId: "1002215957359",
  appId: "1:1002215957359:web:d19aa7318730f710ffbe9a"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;