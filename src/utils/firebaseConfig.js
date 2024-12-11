// Import the functions needed from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvU4KgNb8AwfY8opu64uCt0TufHMWxc2I",
    authDomain: "skillquest-c2f7c.firebaseapp.com",
    projectId: "skillquest-c2f7c",
    storageBucket: "skillquest-c2f7c.firebasestorage.app",
    messagingSenderId: "758210440189",
    appId: "1:758210440189:web:92a9223675c7131b150794",
    measurementId: "G-YD6H5LQB6B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporting initialized services for use in other files
export { app, analytics, auth, db };
