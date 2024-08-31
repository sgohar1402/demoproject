
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKnX_AsK2O9PaYJpsmyxhTPLnCAt17Ow8",
  authDomain: "otpcode-6b464.firebaseapp.com",
  projectId: "otpcode-6b464",
  storageBucket: "otpcode-6b464.appspot.com",
  messagingSenderId: "828880242853",
  appId: "1:828880242853:web:e97d6fb2eb2f9965dc254c",
  measurementId: "G-VTQ3262VYT"
};



firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
