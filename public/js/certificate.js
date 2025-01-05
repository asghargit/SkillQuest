// certificate.js
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app } from "../../src/utils/firebaseConfig.js";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

// Initialize Firestore and Auth
const auth = getAuth(app);
const db = getFirestore(app);

const loadCertificateData = async () => {
    try {
        // Retrieve the userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        // Fetch user data from Firestore using userId
        const userDocRef = doc(db, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userName = userData.userName || "Unknown User"; // If name is not available, fallback to default
            const courseName = localStorage.getItem("course_tit") || "Web Development"; // You can set the course dynamically

            // Inject user and course data into the certificate
            document.getElementById("userName").textContent = userName;
            document.getElementById("courseName").textContent = courseName;
            console.log(`Certificate loaded for ${userName} - ${courseName}`);
        } else {
            console.error("No such user found in Firestore");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

const downloadCertificate = () => {
    const certificate = document.getElementById("certificate");
    html2canvas(certificate, { scale: 2 })
        .then(canvas => {
            const link = document.createElement("a");
            const userName = document.getElementById("userName").textContent.trim();
            link.download = `${userName}_Certificate.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        })
        .catch(error => {
            console.error("Error downloading certificate:", error);
        });
};

// Initialize the certificate functionality
const initCertificate = () => {
    document.addEventListener("DOMContentLoaded", () => {
        loadCertificateData();
        document.getElementById("downloadBtn").addEventListener("click", downloadCertificate);
    });
};

// Export the initialization function
export default initCertificate;
