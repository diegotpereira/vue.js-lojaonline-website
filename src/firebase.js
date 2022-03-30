import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// 👆 This example is using Auth + Firestore

var firebaseConfig = {
    // This comes from Google - add your config here
    apiKey: "AIzaSyB4WJ_nspMyFA_zsSZ9ky_SoQiS2QOp70I",
    authDomain: "website-ecom-ff223.firebaseapp.com",
    databaseURL: "https://website-ecom-ff223-default-rtdb.firebaseio.com",
    projectId: "website-ecom-ff223",
    storageBucket: "website-ecom-ff223.appspot.com",
    messagingSenderId: "144186283636",
    appId: "1:144186283636:web:756204d4a32053179f6321",
    measurementId: "G-S95Y7G7XS5"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collections
const usuarioColecao = db.collection("usuarios");
const recipeCollection = db.collection("recipe");
// 👆 Here you create your Collections you want to use later

// 👇 You export things here | update the variable names
export { db, auth, usuarioColecao, recipeCollection };