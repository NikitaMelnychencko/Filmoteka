import json from '../testcard.json'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getDatabase, ref, set , get,child,update,remove} from 'firebase/database';
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
writeUserData("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue',)

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
//getUser("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue' )

//getId
async function getIdUser(userId, store, id ) {
  get(child(dbRef, 'users/' + userId +"/"+ store +"/"+ id)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

getIdUser("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue', 2 )

//update
function updateData(userId, store) {
  update(ref(db, 'users/' + userId +"/"+ store), {
    2: 99999 
  });
}
//updateData("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue')

//delete
function deleteData(userId, store,idDoc) {
  remove(ref(db, 'users/' + userId + "/" + store+ "/"+ idDoc))
}
//deleteData("azLL3vjsCIYtiNzjKFPlfy4TL722",'Queue','2')