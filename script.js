let prevScroll = 0;
window.addEventListener("scroll", () => {
    const arrow = document.getElementById("down-arrow");
    let currScroll = window.scrollY;

    if (currScroll > prevScroll) {  // scrolling down
        arrow.classList.add("active");
    } else if (currScroll < prevScroll) {   // scrolling up
        arrow.classList.remove("active");
    }

    prevScroll = currScroll;
});
