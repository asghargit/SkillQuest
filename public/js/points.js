// Import necessary Firestore methods
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db } from "../../src/utils/firebaseConfig.js";;  // Import db from your Firebase config
import { app } from "../../src/utils/firebaseConfig.js";


// Retrieve points from Firestore
export async function getPoints(userId) {
    const userDocRef = doc(db, "users", userId);  // Reference to the user's document in Firestore
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
        return userDoc.data().points;  // Return the points from Firestore
    } else {
        console.log("No such document!");
        return null;
    }
}

// Update points in Firestore
export async function updatePoints(userId, newPoints) {
    const userDocRef = doc(db, "users", userId);  // Reference to the user's document in Firestore
    await updateDoc(userDocRef, {
        points: newPoints  // Update the points in Firestore
    });
    console.log("Points updated successfully");
}
