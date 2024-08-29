// firebase.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAfxbnGMeqY7kskfAXt2TK2XM7n-_8_NQU",
  authDomain: "eportaldb-9aadb.firebaseapp.com",
  projectId: "eportaldb-9aadb",
  storageBucket: "eportaldb-9aadb.appspot.com",
  messagingSenderId: "7333745829",
  appId: "1:7333745829:web:13a58ff96c551e28c9294c",
  measurementId: "G-RC22CRFYGF"
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
