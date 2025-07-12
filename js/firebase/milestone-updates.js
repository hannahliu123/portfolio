// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCs0tT5ACiOgNBkpmbgpt_9d92lfGexy0M",
    authDomain: "my-blog-986f0.firebaseapp.com",
    projectId: "my-blog-986f0",
    storageBucket: "my-blog-986f0.firebasestorage.app",
    messagingSenderId: "220461177065",
    appId: "1:220461177065:web:8be8ecf1dcb07cef657878",
    measurementId: "G-6Y79WDNFCP"
};

// Initialize Firebase & Firestore db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);       // my connected Firestore database

async function loadUpdates(section) {
    const docRef = doc(db, "milestones", section);    // reference to desired document
    const docSnap = await getDoc(docRef);   // snapshot of current data

    if (!docSnap.exists()) {
        console.log("No document found.");
        return;
    }

    const docData = docSnap.data();
    showUpdates(docData, section);
}

async function showUpdates(data, section) {
    const content = document.querySelector(`.${section}.content`);

    for (const fieldName in data) {
        const fieldValue = data[fieldName];
        let container = document.createElement("div");
        container.innerHTML = `
            <p class="date">${fieldValue[0]}</p>
            <p class="description">${fieldValue[1]}</p>
        `;
        content.prepend(container);
    }
}

loadUpdates("academics");
loadUpdates("computer-science");
loadUpdates("robotics");
loadUpdates("fencing");
loadUpdates("guzheng");
loadUpdates("personal");

// Authentication - UHHH let's do this later
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("You are logged in!")
        console.log("UID:", user.uid);
    } else {
        console.log("You are NOT logged in.")
    }
});
