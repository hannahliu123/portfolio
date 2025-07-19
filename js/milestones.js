const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const child = card.querySelector(".content");
        child.classList.toggle("expand");
    });
});
