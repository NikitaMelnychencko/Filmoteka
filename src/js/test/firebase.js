// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyCrhBW63SM95ZUKCf6EsxC1CtzGhzdJBtQ",
//   authDomain: "goit-js10-films-library.firebaseapp.com",
//   databaseURL: "https://goit-js10-films-library-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "goit-js10-films-library",
//   storageBucket: "goit-js10-films-library.appspot.com",
//   messagingSenderId: "365608496961",
//   appId: "1:365608496961:web:88f6a83f1a1fc4849dfbc0",
//   measurementId: "G-5Z0M6YF9RQ"
// });
// const auth = getAuth(firebaseApp)
// const db = getFirestore(firebaseApp)

//   async function getUsers(db) {
//     const citiesCol = collection(db, "goit-js10-films-library-default-rtdb")
//     const citySnapshot = await getDocs(citiesCol);
//     console.log(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
    
//     return cityList;
//   }
// getUsers(db)


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore, collection, getDocs,doc } from 'firebase/firestore';
// import { } from "firebase/database";
// import { } from "firebase/storage";
// import {  } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig= {
//   apiKey: "AIzaSyBU3Wc3Z3R37hTZkFlOc3KVu8xNH1dedWg",
//   authDomain: "fir-test-a5c95.firebaseapp.com",
//   projectId: "fir-test-a5c95",
//   storageBucket: "fir-test-a5c95.appspot.com",
//   messagingSenderId: "182392685843",
//   appId: "1:182392685843:web:affe727b10036cb775c6e6",
//   measurementId: "G-BZY0VQZMS4"
// }

// const firestore = getFirestore()

// const special = doc(firestore,'daily/2021-09-14')