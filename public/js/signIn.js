// signIn.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { app } from "../../src/utils/firebaseConfig.js";

const auth = getAuth(app);

export async function signIn() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Add any navigation or redirection here
        window.location.href = "home.html"; 
    } catch (error) {
        alert(error.message);
    }
}
