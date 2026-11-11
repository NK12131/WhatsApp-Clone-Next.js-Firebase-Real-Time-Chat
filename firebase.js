import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCVAHtSRAJos5ANphN0my2xtnaDf46q3oc",
  authDomain: "whatsapp-711ce.firebaseapp.com",
  projectId: "whatsapp-711ce",
  storageBucket: "whatsapp-711ce.appspot.com",
  messagingSenderId: "63514611719",
  appId: "1:63514611719:web:f924cf7790c568d3c99aa2",
  measurementId: "G-GCZCJ9Y7RS"
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
