import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
} from 'firebase/firestore';
import { refs } from '../refs/refs';

const firebaseConfig = {
  apiKey: 'AIzaSyCrhBW63SM95ZUKCf6EsxC1CtzGhzdJBtQ',
  authDomain: 'goit-js10-films-library.firebaseapp.com',
  databaseURL:
    'https://goit-js10-films-library-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'goit-js10-films-library',
  storageBucket: 'goit-js10-films-library.appspot.com',
  messagingSenderId: '365608496961',
  appId: '1:365608496961:web:88f6a83f1a1fc4849dfbc0',
  measurementId: 'G-5Z0M6YF9RQ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// const filmData = {
//   name: value,
//   genre: [value, value],
//   age: value,
//   vote: value,
//   votes: value,
//   popularity: value,
//   about: value,
//   img: link,
// };

const email = 'test@gmail.com';
const password = 'tesdadt1';
// const email = 'test3@gmail.com';
// const password = 'tesdadt122';
const pageChoose = `watched`;

// get
async function getUsers(db, userId, group) {
  const docRef = doc(db, `users/${userId}/${group}/films`);
  const usersSnapshot = await getDoc(docRef);
  if (usersSnapshot.exists()) {
    console.log('Document data:', usersSnapshot.data());
    return usersSnapshot.data();
  } else {
    console.log('No such document!');
  }
}

// Aut User
signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    onAuthStateChanged;
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

// State User
onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    getUsers(db, `${uid}`, `${pageChoose}`);
    sessionStorage.setItem('userId', `${uid}`);
  } else {
  }
});
// Reg User
// Post

// async function postUsers(db, userId, group) {
//   try {
//     const docRef = await addDoc(
//       collection(db, `users/${userId}/${group}/films`),
//       {
//         first: 'Ada',
//         last: 'Lovelace',
//         born: 1815,
//       },
//     );
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// }
// createUserWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     const user = userCredential.user;
//     const uid = user.uid;
//     postUsers(db, `${uid}`, `watched`);
//     // postUsers(db, uid, `queue`);
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
