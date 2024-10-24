
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
