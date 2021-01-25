import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
// 貼上取得的 Firebase SDK 內容
var firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY,
    authDomain: "vue-shop-app-8f292.firebaseapp.com",
    projectId: "vue-shop-app-8f292",
    storageBucket: "vue-shop-app-8f292.appspot.com",
    messagingSenderId: "1055741519554",
    appId: "1:1055741519554:web:41d48de3d2a345754afd5b",
    measurementId: "G-CY30KSS5E0"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }

