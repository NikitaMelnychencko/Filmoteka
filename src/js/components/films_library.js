// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCrhBW63SM95ZUKCf6EsxC1CtzGhzdJBtQ',
  authDomain: 'goit-js10-films-library.firebaseapp.com',
  projectId: 'goit-js10-films-library',
  storageBucket: 'goit-js10-films-library.appspot.com',
  messagingSenderId: '365608496961',
  appId: '1:365608496961:web:88f6a83f1a1fc4849dfbc0',
  measurementId: 'G-5Z0M6YF9RQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(firebase);
// var email = 'myemail@email.com';
// var password = 'mypassword';

// firebase
//   .auth()
//   .signInWithEmailAndPassword(email, password)
//   .catch(function (error) {
//     console.log(error.code);
//     console.log(error.message);
//   });
