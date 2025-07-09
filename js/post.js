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

// Extract id
const queryString = window.location.search;     // section of URL after ?
const params = new URLSearchParams(queryString);
const postID = params.get("id");

async function loadPost() {
    if (!postID) {  // null
        console.log("Post ID missing.");
        return;
    }

    const docRef = doc(db, "posts", postID);    // reference to desired document
    const docSnapshop = await getDoc(docRef);   // snapshot of current data

    if (!docSnapshop.exists()) {
        console.log("No document found.");
        console.log(docSnapshop);
        return;
    }

    const post = docSnapshop.data();
    showPost(post);
}

async function showPost(post) {
    const container = document.getElementById("post-container");

    container.innerHTML = `
        <h1 class="title">${post.title}</h1>
        <div class="details">
            <div class="author">
                <img src="photos/blog/author.jpg" class="author-img" alt="Author Image">
                <p class="author-name">Hannah Liu</p>
            </div>
            <p class="date">${post.date}</p>
        </div>
        <img src="${post.coverImg}" class="cover-img" alt="Cover Image">
    `;

    post.content.forEach(block => {
        if (block.startsWith("/photos/blog/")) { // image
            console.log("hello123");
            const img = document.createElement("img");
            img.src = block;
            img.classList.add("content-img");
            container.appendChild(img);
        } else {    // text
            const p = document.createElement("p");
            p.textContent = block;
            p.classList.add("content-text");
            container.appendChild(p);
        }
    });
}

loadPost();

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
