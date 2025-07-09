const navMenuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const navBottom = document.getElementById("bottom");
const logo = document.getElementById("logo");

navMenuBtn.addEventListener("click", () => {
    navBottom.classList.toggle("mobile-menu-open");
    document.body.classList.toggle("mobile-menu-open");
    if (navBottom.classList.contains("mobile-menu-open")) {
        navMenuBtn.textContent = "✕";
    } else {
        navMenuBtn.textContent = "☰";
    }
});

navLinks.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
        navBottom.classList.remove("mobile-menu-open");
        document.body.classList.remove("mobile-menu-open");
        navMenuBtn.textContent = "☰";
    }
});

logo.addEventListener("click", () => {
    window.location.assign("index.html");
});
