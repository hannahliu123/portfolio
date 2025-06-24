document.addEventListener("DOMContentLoaded", () => {
    // ========== Widely Used Variables ==========
    const aboutMeSection = document.getElementById("about-me-section");
    let direction = 1;
    const filmstripContainer = document.getElementById("filmstrip");

    // ========== Functions ======================
    function animateScroll() {
        const endXScroll = filmstripContainer.scrollWidth - filmstripContainer.clientWidth;
        const currXScroll = filmstripContainer.scrollLeft;

        filmstripContainer.scrollLeft += direction*2;
        if (direction === 1 && currXScroll >= endXScroll - 1) direction = -1;
        else if (direction === -1 && currXScroll <= 1) direction = 1;

        if (filmstripContainer.classList.contains("scroll")) requestAnimationFrame(animateScroll);
    }

    // ========== Event Listeners ================
    const test1 = document.getElementById("test1");
    const test2 = document.getElementById("test2");
    const test3 = document.getElementById("test3");

    const navBar = document.getElementById("nav-bar");
    const aboutMeYPos = aboutMeSection.offsetTop;
    let prevScroll = 0;
    window.addEventListener("scroll", () => {
        let currYScroll = window.scrollY;

        test1.textContent = aboutMeYPos;
        test2.textContent = currYScroll;
        test3.textContent = currYScroll;

        if (currYScroll+1 >= aboutMeYPos) {
            navBar.classList.add("active");
        } else {
            navBar.classList.remove("active");
            const arrow = document.getElementById("down-arrow");
            if (currYScroll > prevScroll) {  // scrolling down
                arrow.classList.add("active");
                setTimeout(() => {
                    arrow.classList.remove("active");
                }, 750);   // 750 ms
            } else if (currYScroll < prevScroll) {   // scrolling up
                arrow.classList.remove("active");
            }
        }

        prevScroll = currYScroll;
    });

    const aboutMeBtn = document.getElementById("about-me-button");
    aboutMeBtn.addEventListener("click", () => {
        aboutMeSection.scrollIntoView({behavior: "smooth"});
    });

    // filmstrip scroll
    filmstripContainer.addEventListener("click", () => {
        filmstripContainer.classList.toggle("scroll");
        if (filmstripContainer.classList.contains("scroll")) requestAnimationFrame(animateScroll);
    });
});
