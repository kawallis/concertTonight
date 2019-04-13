import firebase from 'firebase'
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyA-pl_Cy0d1Ly135GrKogdgJwqtsS5BgHk",
    authDomain: "music-79ab6.firebaseapp.com",
    databaseURL: "https://music-79ab6.firebaseio.com",
    projectId: "music-79ab6",
    storageBucket: "music-79ab6.appspot.com",
    messagingSenderId: "690826773608"
};


firebase.initializeApp(config);

export const auth = firebase.auth()
