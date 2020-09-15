import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "dicerooms.firebaseapp.com",
  databaseURL: "https://dicerooms.firebaseio.com",
  projectId: "dicerooms",
  storageBucket: "dicerooms.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);

export default firebase.firestore();
