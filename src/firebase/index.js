import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDB1ukwLJG-9H3UeaWh207jDAj3oMH4PqE",
    authDomain: "monosfer-wavesurfer.firebaseapp.com",
    databaseURL: "https://monosfer-wavesurfer.firebaseio.com",
    projectId: "monosfer-wavesurfer",
    storageBucket: "monosfer-wavesurfer.appspot.com",
    messagingSenderId: "825280452886",
    appId: "1:825280452886:web:36693d2a0fc931b1"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}