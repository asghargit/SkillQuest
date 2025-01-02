import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app } from "../../src/utils/firebaseConfig.js";

const auth = getAuth(app);
const db = getFirestore(app);

export async function signIn() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Store the user's UID for future updates
            localStorage.setItem("userUid", user.uid);

            // Log the points to the console (or display them in the UI)
            console.log("User Points:", userData.points);

            // Redirect to home page
            window.location.href = "home.html";
        } else {
            alert("User data not found in Firestore.");
        }
    } catch (error) {
        alert(error.message);
    }
}
