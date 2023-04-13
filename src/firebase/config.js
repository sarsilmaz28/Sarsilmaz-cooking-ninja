import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANXdH2VUxYBt1EE8WXvTXrOC0h5jyTXWw",
    authDomain: "cooking-ninja-5665a.firebaseapp.com",
    projectId: "cooking-ninja-5665a",
    storageBucket: "cooking-ninja-5665a.appspot.com",
    messagingSenderId: "601005511024",
    appId: "1:601005511024:web:7e42594587410e44f3ffb5",
    measurementId: "G-29CDXHDDXH"
  };

//initialise firebase
firebase.initializeApp(firebaseConfig)

//initialise services
const projectFirestore= firebase.firestore()

export {projectFirestore}
