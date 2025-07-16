// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore db
const db = getFirestore(app);       // my connected Firestore database
const postsRef = collection(db, "posts");

let postsArray = [];
const postsContainer1 = document.getElementById("posts-row1");
const postsContainer2 = document.getElementById("posts-row2");
let postsToShowCount = 2;     // number of posts to show in the blog preivew on my homepage
if (window.innerWidth >= 1000) postsToShowCount = 4;
let count = 1;

async function getPosts() {
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach(doc => {
        postsArray.push(doc.data());
    });

    postsArray = postsArray.slice(0, postsToShowCount);

    postsArray.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        let previewText = post.content[0];
        const words = previewText.split(" ");
        previewText = words.slice(0, 25).join(" ");
        postDiv.innerHTML = `
            <img src="${post.coverImg}" alt="Cover Image" class="post-cover-img click">
            <div class="post-description">
                <h2 class="post-title click">${post.title}</h2>
                <p class="post-date click">${post.date}</p>
                <p class="post-text">${previewText}...</p>
                <button class="read-more-btn click">Read More</button>
            </div>
        `;
        
        if (count % 2 == 1) postsContainer1.appendChild(postDiv);
        else postsContainer2.appendChild(postDiv);
        count++;

        // Event Listeners for Posts
        const clickable = postDiv.querySelectorAll(".click");
        clickable.forEach(item => {
            item.addEventListener("click", () => {
                window.location.href = "https://blog.byhannahliu.com/post.html?id=" + post.id;
            });
        });
    });
}

getPosts();

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
