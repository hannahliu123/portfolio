// ========== Widely Used Variables ==========
const aboutMeSection = document.getElementById("about-me-section");

// Show Nav Bar
const navBar = document.getElementById("nav-bar");
const aboutMeYPos = aboutMeSection.getBoundingClientRect().top;
let prevScroll = 0;
window.addEventListener("scroll", () => {
    let currScroll = window.scrollY;

    if (currScroll+1 >= aboutMeYPos) {
        navBar.classList.add("active");
    } else {
        navBar.classList.remove("active");
        const arrow = document.getElementById("down-arrow");
        if (currScroll > prevScroll) {  // scrolling down
            arrow.classList.add("active");
            setTimeout(() => {
                arrow.classList.remove("active");
            }, 750);   // 750 ms
        } else if (currScroll < prevScroll) {   // scrolling up
            arrow.classList.remove("active");
        }
    }

    prevScroll = currScroll;
});

const aboutMeBtn = document.getElementById("about-me-button");
aboutMeBtn.addEventListener("click", () => {
    aboutMeSection.scrollIntoView({behavior: "smooth"});
});
