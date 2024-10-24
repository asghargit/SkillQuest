
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
  const auth = getAuth(app);

  // Sign Up Function
  const signUpForm = document.getElementById('signUpForm');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission refresh
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("User signed up successfully");
        // Redirect user or update the UI
        window.location.href = '../pages/home.html'; // Example redirection to dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error signing up: " + errorMessage);
      });
  });


