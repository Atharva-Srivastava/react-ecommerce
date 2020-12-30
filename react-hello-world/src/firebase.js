import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDmTRZfSyZYFEKJwkncTUEusttxzFCd3Jw",
    authDomain: "e-commerce-989da.firebaseapp.com",
    projectId: "e-commerce-989da",
    storageBucket: "e-commerce-989da.appspot.com",
    messagingSenderId: "149153587317",
    appId: "1:149153587317:web:db619a8dfc5838f084183c"
  })

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  export { db, storage, firebase as default };