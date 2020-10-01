import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'dicerooms-e42dd.firebaseapp.com',
  databaseURL: 'https://dicerooms-e42dd.firebaseio.com',
  projectId: 'dicerooms-e42dd',
  storageBucket: 'dicerooms-e42dd.appspot.com',
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);

export default firebase;
