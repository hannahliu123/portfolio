const cards = document.querySelectorAll(".content");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("expand");
    });
});
