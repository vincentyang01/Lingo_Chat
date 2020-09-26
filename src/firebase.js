import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPtygDuJvvBNMekHOrv5TUgTlIJtHmDy4",
    authDomain: "slack-baf73.firebaseapp.com",
    databaseURL: "https://slack-baf73.firebaseio.com",
    projectId: "slack-baf73",
    storageBucket: "slack-baf73.appspot.com",
    messagingSenderId: "901512342572",
    appId: "1:901512342572:web:d50655ae69ef62187c3589",
    measurementId: "G-MTZ17F2ZFC"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;