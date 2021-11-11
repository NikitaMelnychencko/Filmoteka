// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);

async function getCities(db) {
  const citiesCol = collection(db, 'users');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
// const usersList = collection(db, 'users');

// console.log(cityList);

//function to save file
// function previewFile() {
//   const storage = firebase.storage();

//   const file = document.getElementById('files').files[0];
//   console.log(file);

//   const storageRef = firebase.storage().ref();

//   //dynamically set reference to the file name
//   const thisRef = storageRef.child(file.name);

//   //put request upload file to firebase storage
//   thisRef.put(file).then(function (snapshot) {
//     console.log('Uploaded a blob or file!');
//   });

//   //get request to get URL for uploaded file
//   thisRef.getDownloadURL().then(function (url) {
//     console.log(url);
//   });
// }

// // // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// async function getUsers(db) {
//   const usersCol = collection(db, 'users');
//   const usersSnapshot = await getDocs(usersCol);
//   const usersList = usersSnapshot.docs.map(doc => doc.data());
//   return usersList;
// }

// getUsers('users');

// Регестраци, получение айди и создание базы юзера
// Авторизация, получение айди и поолучение доступа к базе юзера

// // const email = 'myemail@email.com';
// // const password = 'mypassword';

// // firebase
// //   .auth()
// //   .signInWithEmailAndPassword(email, password)
// //   .catch(function (error) {
// //     console.log(error.code);
// //     console.log(error.message);
// //   });

// // const ref = firebase.database().ref('users');

// // console.log(ref);
// export class Question {
//   static create(question) {
//     return fetch(input: 'https://goit-js10-films-library-default-rtdb.europe-west1.firebasedatabase.app/',
//       init: {
//         method: 'POST',
//         body: JSON.stringify(question),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//     })
//       .then(onfulfilled: response => response.json())
//       .then(onfulfilled: response => {
//       console.log(response)
//     })
//   }
// }

// function getUsersFromLocalStorage() {
//   return JSON.parse(text: localStorage.getItem(key: 'users') || ]'[]')
// }
