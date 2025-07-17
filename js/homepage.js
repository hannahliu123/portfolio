document.addEventListener("DOMContentLoaded", () => {
    // ========== Widely Used Variables ==========
    const projectsSection = document.getElementById("projects-section");
    const navBar = document.getElementById("nav-bar");
    const aboutMeBtn = document.getElementById("about-me-button");
    const projectsBtn = document.getElementById("projects-btn");
    const milestonesBtn = document.getElementById("milestones-btn");
    const blogBtn = document.getElementById("blog-btn");
    let aboutMeYPos = 0;
    let prevScroll = 0;
    let navHeight = 80;

    if (window.innerWidth >= 768) navHeight = 120;
    if (window.innerWidth >= 1024) navHeight = 90;

    // ========== Event Listeners ================
    window.addEventListener("scroll", () => {
        aboutMeYPos = projectsSection.offsetTop - navHeight;
        let currYScroll = window.scrollY;

        if (currYScroll+1 >= aboutMeYPos) {
            navBar.classList.add("active");
        } else {
            navBar.classList.remove("active");
        }

        prevScroll = currYScroll;
    });

    aboutMeBtn.addEventListener("click", () => {
        window.location.assign("about-me.html");
    });

    projectsBtn.addEventListener("click", () => {
        window.location.assign("comp-sci.html#projects");
    });

    milestonesBtn.addEventListener("click", () => {
        window.location.assign("milestones.html");
    });

    blogBtn.addEventListener("click", () => {
        window.location.href = "https://blog.byhannahliu.com/";
    });
});
