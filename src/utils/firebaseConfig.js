// Import the functions needed from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA72ytNAe7gt9cAcgmYkdba3InGnUDzIdA",
    authDomain: "skillquest-32d26.firebaseapp.com",
    projectId: "skillquest-32d26",
    storageBucket: "skillquest-32d26.appspot.com",
    messagingSenderId: "882169237830",
    appId: "1:882169237830:web:30e26dcd4e1326ea2e9547",
    measurementId: "G-Z3PJHDFQCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporting initialized services for use in other files
export { app, analytics, auth, db };
