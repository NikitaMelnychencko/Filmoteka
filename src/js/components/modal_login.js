import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDhLb03FaJk92v_guRQR94DqfzbgruF6NI",
  authDomain: "pg10-filmateka.firebaseapp.com",
  databaseURL: "https://pg10-filmateka-default-rtdb.firebaseio.com",
  projectId: "pg10-filmateka",
  storageBucket: "pg10-filmateka.appspot.com",
  messagingSenderId: "919463762973",
  appId: "1:919463762973:web:cfcee0dcd737f3604bbaf4",
  measurementId: "G-KF93Z038TY"
};

const app = initializeApp(firebaseConfig);

