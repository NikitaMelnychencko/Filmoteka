import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  query,
  where,
  doc,
} from 'firebase/firestore';

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

// get
async function getUsers(db, value, group) {
  const docRef = doc(db, `${value}/${group}`);
  //const usersCol = collection(db, velue)
  const usersSnapshot = await getDoc(docRef);
  if (usersSnapshot.exists()) {
    console.log('Document data:', usersSnapshot.data());
    return usersSnapshot.data();
  } else {
    console.log('No such document!');
  }
}
getUsers(db, 'UxVBlbfUAzLkLGc5sUHE4uh8h8G3', 'Other');

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

// const email = 'test@gmail.com';
// const password = 'tesdadt1';
// const auth = getAuth();

// Aut User
// get
// async function getUsers(db, value) {
//   const usersCol = collection(db, value);
//   const usersSnapshot = await getDocs(usersCol);
//   const usersList = usersSnapshot.docs.map(doc => doc.data());
//   console.log(usersList);
//   return usersList;
// }
// const alovelaceDocumentRef = doc(db, 'users/alovelace');
// console.log(alovelaceDocumentRef);

// signInWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     const user = userCredential.user;
//     // console.log(user);
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

//   const userId = auth.currentUser.uid;
// return onValue(ref(db, '/users/' + userId), (snapshot) => {
//   const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// }, {
//   onlyOnce: true
// });

// State User
// onAuthStateChanged(auth, user => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(uid);
//   } else {
//     // User is signed out
//     // ...
//   }
// });
// Reg User
//Post
// async function postUsers(db, value) {
//   try {
//     const docRef = await addDoc(collection(db, value), {
//       first: 'Ada',
//       last: 'Lovelace',
//       born: 1815,
//     });
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// createUserWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     const user = userCredential.user;
//     postUsers(db, 'users')
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//postUsers(db, 'users');
