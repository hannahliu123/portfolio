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

async function loadUpdates() {
    const aboutMeDocRef = doc(db, "updates", "about-me-updates");    // reference to desired document
    const aboutMeDocSnapshop = await getDoc(aboutMeDocRef);   // snapshot of current data

    if (!aboutMeDocSnapshop.exists()) {
        console.log("No document found.");
        return;
    }

    const aboutMeUpdates = aboutMeDocSnapshop.data();
    showAboutMeUpdates(aboutMeUpdates);
}

async function showAboutMeUpdates(aboutMeUpdates) {
    const projects = document.getElementById("recent-projects");
    const cp = document.getElementById("recent-cp");
    const robotics = document.getElementById("recent-robotics");
    const fencing = document.getElementById("recent-fencing");
    const guzheng = document.getElementById("recent-guzheng");
    const reading = document.getElementById("recent-reading");
    const baking = document.getElementById("recent-baking");

    projects.textContent = aboutMeUpdates.projects;
    cp.textContent = aboutMeUpdates.cp;
    robotics.textContent = aboutMeUpdates.robotics;
    fencing.textContent = aboutMeUpdates.fencing;
    guzheng.textContent = aboutMeUpdates.guzheng;
    reading.textContent = aboutMeUpdates.reading;
    baking.textContent = aboutMeUpdates.baking;
}

loadUpdates();

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
