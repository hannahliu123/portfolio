document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);

    // ========== Widely Used Variables ==========
    const aboutMeSection = document.getElementById("about-me-section");

    // ========== Functions ======================


    // ========== Event Listeners ================
    const navBar = document.getElementById("nav-bar");
    const aboutMeYPos = aboutMeSection.getBoundingClientRect().top;
    let prevScroll = 0;
    window.addEventListener("scroll", () => {
        let currYScroll = window.scrollY;

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
    let direction = 1;
    const filmstripContainer = document.getElementById("filmstrip");
    const endXScroll = filmstripContainer.scrollWidth - filmstripContainer.clientWidth;
    filmstripContainer.addEventListener("click", () => {
        filmstripContainer.classList.toggle("scroll");
        let scrollID = setInterval(() => {
            filmstripContainer.scrollBy({left: direction*5, top: 0, behavior: "smooth"});
            currXScroll = filmstripContainer.scrollLeft;

            if (!filmstripContainer.classList.contains("scroll")) clearInterval(scrollID);
            else if (direction === 1 && currXScroll >= endXScroll) direction = -1;
            else if (direction === -1 && currXScroll === 0) direction = 1;
        }, 50);     // scroll right 5px this every 50 ms
    });

    const test1 = document.getElementById("test1");
    const test2 = document.getElementById("test2");
    const test3 = document.getElementById("test3");
    const test4 = document.getElementById("test4");
    filmstripContainer.addEventListener("scroll", () => {
        test1.textContent = direction;
        test2.textContent = currXScroll;
        test3.textContent = endXScroll;
        test4.textContent = direction === 1;
    });
});
