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
    const cpDocRef = doc(db, "updates", "competitive-programming-updates");    // reference to desired document
    const cpDocSnapshop = await getDoc(cpDocRef);   // snapshot of current data

    if (!cpDocSnapshop.exists()) {
        console.log("No document found.");
        return;
    }

    const cpUpdates = cpDocSnapshop.data();
    showCpUpdates(cpUpdates);
}

async function showCpUpdates(cpUpdates) {
    const currUpdates = document.getElementById("curr-updates");
    const usaco = document.getElementById("curr-USACO");
    const codeforces = document.getElementById("curr-codeforces");
    const atcoder = document.getElementById("curr-atcoder");

    currUpdates.innerHTML = cpUpdates.progress;
    usaco.innerHTML = cpUpdates.usaco;
    codeforces.innerHTML = cpUpdates.codeforces[0];
    atcoder.innerHTML = cpUpdates.atcoder[0];
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
