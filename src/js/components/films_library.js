import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from 'firebase/database';

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
const db = getDatabase();
const dbRef = ref(getDatabase());
const auth = getAuth();
const user = auth.currentUser;
const userId = sessionStorage.getItem('userId');
// const email = sessionStorage.getItem('email');
// const password = sessionStorage.getItem('password');

const filmId = 534536;
// const email = 'test@gmail.com';
// const password = 'tesdadt1';
// const email = 'test3@gmail.com';
// const password = 'tesdadt122';
// const email = 'eosipopo@gmail.com';
// const password = '12345679';

// sessionStorage = JSON.stringify({
//   email: 'eosipopo@gmail.com',
//   password: '12345679',
// });

// getUser(`${userId}`, `watched`);
// getUser(`${userId}`, 'queue');

// Reg User
async function regUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// Aut User
async function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('111');
    });
}
// signInUser('test@gmail.com', 'tesdadt1');

async function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}
// signOutUser();
console.log(auth);

// State User
async function AuthState(user) {
  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      // console.log(uid);
      sessionStorage.setItem('userId', `${uid}`);
    } else {
    }
  });
}
window.onload = function () {
  AuthState(user);
};

//getId
async function getIdUser(userId, store, id) {
  get(child(dbRef, 'users/' + userId + '/' + store + '/' + id))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
// getIdUser('azLL3vjsCIYtiNzjKFPlfy4TL722', 'queue', 2);

// get
async function getUser(userId, store) {
  get(child(dbRef, 'users/' + userId + '/' + store))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
// getUser(`${userId}`, `watched`);

// Post
export async function writeUserData(userId, store) {
  set(ref(db, 'users/' + userId + '/' + store), {
    filmId: filmData,
  });
}
// writeUserData(`${userId}`, `watched`);

//update
async function updateData(userId, store) {
  update(ref(db, 'users/' + userId + '/' + store), {
    2: 99999,
  });
}
//updateData("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue')

//delete
async function deleteData(userId, store, idDoc) {
  remove(ref(db, 'users/' + userId + '/' + store + '/' + idDoc));
}
//deleteData("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue','2')
