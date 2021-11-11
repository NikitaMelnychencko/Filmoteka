import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrhBW63SM95ZUKCf6EsxC1CtzGhzdJBtQ',
  authDomain: 'goit-js10-films-library.firebaseapp.com',
  databaseURL:
    'https://goit-js10-films-library-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'goit-js10-films-library',
  storageBucket: 'goit-js10-films-library.appspot.com',
  messagingSenderId: '365608496961',
  appId: '1:365608496961:web:88f6a83f1a1fc4849dfbc0',
  measurementId: 'G-5Z0M6YF9RQ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const email = 'test@gmail.com';
const password = 'tesdadt1';
const auth = getAuth();

// Aut User
// get
async function getUsers(db, value) {
  const usersCol = collection(db, value);
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  console.log(usersSnapshot);
  return usersList;
}

signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    const userId = user.reloadUserInfo.localId;
    // console.log(userId.reloadUserInfo.localId);
    // getUsers(db, `users`);
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

// const arrayUser = signInWithEmailAndPassword((auth, email, password));

// Reg User
// createUserWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//Post
async function postUsers(db, value) {
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
