// Log In Function

  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

  // Login Function
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission refresh
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        alert("User logged in successfully");
        // Redirect or update the UI
        window.location.href = '../pages/home.html' // Example redirection to dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error logging in: " + errorMessage);
      });
  });

