document.addEventListener("DOMContentLoaded", () => {
    // ========== Widely Used Variables ==========
    const filmstripContainer = document.getElementById("filmstrip");
    const updatesHeader = document.querySelectorAll(".updates-click");
    let direction = 1;

    // ========== Functions ======================
    function animateScroll() {
        const endXScroll = filmstripContainer.scrollWidth - filmstripContainer.clientWidth;
        const currXScroll = filmstripContainer.scrollLeft;

        filmstripContainer.scrollLeft += direction*2;
        if (direction === 1 && currXScroll >= endXScroll - 1) direction = -1;
        else if (direction === -1 && currXScroll <= 1) direction = 1;

        if (filmstripContainer.classList.contains("scroll")) requestAnimationFrame(animateScroll);
    }

    // filmstrip scroll
    filmstripContainer.addEventListener("click", () => {
        filmstripContainer.classList.toggle("scroll");
        if (filmstripContainer.classList.contains("scroll")) requestAnimationFrame(animateScroll);
    });

    updatesHeader.forEach(header => {
        header.addEventListener("click", () => {
            const text = document.getElementById("recent-" + header.id)
            text.classList.toggle("active");

            if (text.classList.contains("active")) header.textContent = header.textContent.replace(">", "v");
            else header.textContent = header.textContent.replace("v", ">");;
        });
    });
});
