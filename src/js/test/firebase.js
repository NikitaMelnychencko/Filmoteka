import json from '../testcard.json'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getDatabase, ref, set , get,child,push} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU3Wc3Z3R37hTZkFlOc3KVu8xNH1dedWg",
  authDomain: "fir-test-a5c95.firebaseapp.com",
  databaseURL: "https://fir-test-a5c95-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-test-a5c95",
  storageBucket: "fir-test-a5c95.appspot.com",
  messagingSenderId: "182392685843",
  appId: "1:182392685843:web:affe727b10036cb775c6e6",
  measurementId: "G-BZY0VQZMS4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

//Post
function writeUserData(userId,store) {
  set(ref(db, 'users/' + userId +"/"+ store), {
     0: 123847, 1: 123456, 2: 36589 
  });
}
//writeUserData("azLL3vjsCIYtiNzjKFPlfy4TL700",'Queue',)

// get

async function getUser(userId, store ) {
  get(child(dbRef, 'users/' + userId +"/"+ store)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

//getUser("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue', )


function writeNewPost(userId, store) {

  const postData = {
    2: 99999
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['users/' + userId +"/"+ store] = postData;

  console.log(updates);
  return update(ref(db), updates);
}
writeNewPost("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue')