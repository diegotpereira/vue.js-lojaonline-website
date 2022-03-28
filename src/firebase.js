import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB4WJ_nspMyFA_zsSZ9ky_SoQiS2QOp70I",
    authDomain: "website-ecom-ff223.firebaseapp.com",
    databaseURL: "https://website-ecom-ff223-default-rtdb.firebaseio.com",
    projectId: "website-ecom-ff223",
    storageBucket: "website-ecom-ff223.appspot.com",
    messagingSenderId: "144186283636",
    appId: "1:144186283636:web:756204d4a32053179f6321",
    measurementId: "G-S95Y7G7XS5"
};

//const app = Firebase.initializeApp(config);
//const firebase = app.database();
firebase.initializeApp(config)

export default firebase;