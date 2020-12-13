import firebase from "firebase";

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA09dy9F4pqQRvuk2KEH7g6iLgqqJksg4M",
    authDomain: "robinhood-clone-90d34.firebaseapp.com",
    projectId: "robinhood-clone-90d34",
    storageBucket: "robinhood-clone-90d34.appspot.com",
    messagingSenderId: "1058961750852",
    appId: "1:1058961750852:web:1d1e0c8b4cd2575e0a3511",
    measurementId: "G-C393XD8MLR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export { database };