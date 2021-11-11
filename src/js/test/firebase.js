//Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrhBW63SM95ZUKCf6EsxC1CtzGhzdJBtQ",
  authDomain: "goit-js10-films-library.firebaseapp.com",
  databaseURL: "https://goit-js10-films-library-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goit-js10-films-library",
  storageBucket: "goit-js10-films-library.appspot.com",
  messagingSenderId: "365608496961",
  appId: "1:365608496961:web:88f6a83f1a1fc4849dfbc0",
  measurementId: "G-5Z0M6YF9RQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get
async function getUsers(db,velue) {
  const usersCol = collection(db, velue);
  const usersSnapshot = await getDocs(citiesCol);

  const usersList = citySnapshot.docs.map(doc => doc.data());
  console.log(usersList);
  return usersList;
}
//getUsers(db, 'users');

//Post
async function postUsers(db,value) {
  try {
    const docRef = await addDoc(collection(db, value), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
//postUsers(db, 'users');