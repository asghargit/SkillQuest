// register.js
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app } from "../../src/utils/firebaseConfig.js"; // Ensure this matches the correct path

const auth = getAuth(app);
const db = getFirestore(app);

export async function register() {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const userName = document.getElementById('name').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert("Please enter a valid email and password");
        return;
    }

    if (!validate_field(userName)) {
        alert('Please enter a username');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userData = {
            email: email,
            userName: userName,
            points : 500,
            courses: {},
            lastLogin: Date.now()
        };

        await setDoc(userDocRef, userData);
        alert("User registered successfully!");

    } catch (error) {
        alert(error.message);
    }
}

function validate_email(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}
