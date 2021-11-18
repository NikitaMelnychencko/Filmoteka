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
import { addClass } from '../components/modal_login';
import { refs } from '../refs/refs.js';

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
      swetchClass();
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
      swetchClass();
      addClass;
      if (localStorage.getItem('idFilm') !== null) {
        updateButton(localStorage.getItem('idFilm'));
      }
      return userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      signInErrorRender(errorMessage);
    });
}

async function signInErrorRender(errorMessage) {
  let errorText = '0';

  if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
    errorText = 'Пользователь не обнаружен';
  } else if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
    errorText = 'Неверный пароль';
  } else if (
    errorMessage ===
    'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
  ) {
    errorText = 'Слишком много попыток';
  } else {
    errorText = 'Unknow Error';
  }

  refs.modalError.classList.remove('modal__error--hidden');
  refs.modalError.innerHTML = `<p class="modal__error-text">${errorText}</p>`;
}

export async function updateInUser(name) {
  return await updateProfile(auth.currentUser, {
    displayName: `${name}`,
  })
    .then(data => {})
    .catch(error => {
      // An error occurred
      // ...
    });
}

export async function signOutUser() {
  return await signOut(auth)
    .then(() => {
      // Sign-out successful.
      userId = null;
      sessionStorage.removeItem('userId');
      swetchClass();
    })
    .catch(error => {
      // An error happened.
    });
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
    .catch(error => {
      console.error(error);
    });
  let arr = [];
  for (let key in value) {
    arr.push(JSON.parse(value[key]).objService);
  }
  return arr;
}

// Post
export async function postUserData(userId, store, idFilm, markupFilm) {
  if (userId === null) {
    return;
  }
  return await set(
    ref(db, 'users/' + userId + '/' + store + '/' + idFilm),
    markupFilm,
  );
}

// //update
// async function updateData(userId, store, idFilm, markupFilm) {
//   return await update(
//     ref(db, 'users/' + userId + '/' + store + '/' + idFilm),
//     markupFilm,
//   );
// }

//delete
export async function deleteData(userId, store, idFilm) {
  return await remove(ref(db, 'users/' + userId + '/' + store + '/' + idFilm));
}
