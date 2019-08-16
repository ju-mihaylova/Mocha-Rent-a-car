import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyD11fcAgI70fTdm6SX_tmE4fTsKT02Z7dU",
authDomain: "mocha-rent-a-car.firebaseapp.com",
databaseURL: "https://mocha-rent-a-car.firebaseio.com",
projectId: "mocha-rent-a-car",
storageBucket: "",
messagingSenderId: "247274208208",
appId: "1:247274208208:web:68d09c5622beef2f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();

