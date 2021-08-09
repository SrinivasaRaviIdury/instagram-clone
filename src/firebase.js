import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAfgePMh737HckGYoeR0SDXDLT33iPdTfs",
  authDomain: "instagram-clone-raviahlad.firebaseapp.com",
  projectId: "instagram-clone-raviahlad",
  storageBucket: "instagram-clone-raviahlad.appspot.com",
  messagingSenderId: "717347823734",
  appId: "1:717347823734:web:c606a5094b08c38c4cbf57",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
