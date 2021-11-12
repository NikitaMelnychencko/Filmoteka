//Import the functions you need from the SDKs you need
import json from '../data/main.json'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  setDoc,
  query,
  where,
  doc,
  updateDoc,
   arrayUnion, arrayRemove 
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU3Wc3Z3R37hTZkFlOc3KVu8xNH1dedWg",
  authDomain: "fir-test-a5c95.firebaseapp.com",
  projectId: "fir-test-a5c95",
  storageBucket: "fir-test-a5c95.appspot.com",
  messagingSenderId: "182392685843",
  appId: "1:182392685843:web:affe727b10036cb775c6e6",
  measurementId: "G-BZY0VQZMS4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get
async function getUsers(db, velue, grup) {
  const docRef = doc(db, `${velue}/${grup}`);
  //const usersCol = collection(db, velue)
  const usersSnapshot = await getDoc(docRef);
  if (usersSnapshot.exists()) {
    console.log('Document data:', usersSnapshot.data());
    return usersSnapshot.data();
  } else {
    console.log('No such document!');
  }
}
getUsers(db, 'users', '82Gz74gHWziXivF9ZDtL');

//Post
// async function postUsers(db, value) {
//   try {
//     const docRef = await addDoc(collection(db, value), {
//       films: [{}, {}, {}]
//     });
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// }
// postUsers(db, 'use');

const congo = {name: 'drama', value: 130, about: {name: 'drama'}, tabel:{}}
const movie = [{ name: 'drama', value: 130, about: { name: 'drama' }, tabel: {} }]

console.log(json);
async function postUsers(db, value,user,movie) {
  try {
    const docRef = await setDoc(doc(db, `${value}`, `${user}`), {
      json
     })    
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
 //postUsers(db, 'Watched','azLL3vjsCIYtiNzjKFPlfy4TL722',congo);
 //postUsers(db, 'Queue','azLL3vjsCIYtiNzjKFPlfy4TL722', congo);

async function updateUsers(db, value,user,movie) {
  try {
    const docRef = await updateDoc(doc(db, `${value}`, `${user}`), {
      json
     })    
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
 updateUsers(db, 'Watched','azLL3vjsCIYtiNzjKFPlfy4TL722',congo);