import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeyTre2f_CRnc132aM89XX9psct0AEzf0",
    authDomain: "todo-firebase-crud-app.firebaseapp.com",
    projectId: "todo-firebase-crud-app",
    storageBucket: "todo-firebase-crud-app.appspot.com",
    messagingSenderId: "253949700313",
    appId: "1:253949700313:web:00116cab2ccde5ebb976c8",
    measurementId: "G-2CP1MWSS23"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);