import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfB3fyNAPJv8pu2srI5Vvy_qB9HN9guqY",
  authDomain: "reactlinks-3cd1c.firebaseapp.com",
  projectId: "reactlinks-3cd1c",
  storageBucket: "reactlinks-3cd1c.appspot.com",
  messagingSenderId: "882896228935",
  appId: "1:882896228935:web:4091d732ec034c02a95762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Cria a autenticação
const db = getFirestore(app); //Cria o bd

export { auth, db };