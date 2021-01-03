import firebase from 'firebase/app'
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCu-i7wX0AwRLBttx_iAsebh3oxhW7_Jzw",
    authDomain: "fir-web-codelab-a34f4.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-a34f4.firebaseio.com",
    projectId: "fir-web-codelab-a34f4",
    storageBucket: "fir-web-codelab-a34f4.appspot.com",
    messagingSenderId: "825069866219",
    appId: "1:825069866219:web:867e010fd19ff966eb02ae",
    measurementId: "G-EKDQWPZM1S"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire.database().ref();