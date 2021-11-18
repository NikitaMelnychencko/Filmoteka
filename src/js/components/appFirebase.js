import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
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
import { swetchClass } from '../layout/static/header';
import { updateButton } from '../layout/modal_one_movie';
import {renderErrorServer} from './error'

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
export const user = auth.currentUser;
export let userId = sessionStorage.getItem('userId');
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
export function regUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      swetchClass()
      return userCredential.user.uid;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// Aut User
export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      swetchClass()
      if(localStorage.getItem('idFilm') !== null){updateButton(localStorage.getItem('idFilm'))} 
      return userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function updateInUser(name) {
  return await updateProfile(auth.currentUser, {
    displayName: `${name}`,
  })
}

export async function signOutUser() {
  return await signOut(auth)
    .then(() => {
      // Sign-out successful.
      userId = null;
      sessionStorage.removeItem('userId');
      swetchClass()
    })

}

// State User
export async function AuthState(user) {
  return await onAuthStateChanged(auth, user => {
    if (user) {
      userId = user.uid;
      return sessionStorage.setItem('userId', `${userId}`);
    } else {
      return;
    }
  });
}

window.onload = function () {
  AuthState(user);
};

//getId
export async function getIdUser(userId, store, id) {
  return await get(child(dbRef, 'users/' + userId + '/' + store + '/' + id))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// get
export async function getUser(userId, store) {
  let value = await get(child(dbRef, 'users/' + userId + '/' + store))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(() => renderErrorServer());
  let arr = [];
  for (let key in value) {
    arr.push(JSON.parse(value[key]).objService);
  }
  return arr;
}

// Post
export async function postUserData(userId, store, idFilm, markupFilm) {
  if (userId===null) {
    return
  }
  return await set(
    ref(db, 'users/' + userId + '/' + store + '/' + idFilm),
    markupFilm,
  );
}


//delete
export async function deleteData(userId, store, idFilm) {
  return await remove(ref(db, 'users/' + userId + '/' + store + '/' + idFilm));
}
