const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

document.addEventListener("click", () => {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});

navLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});

const addFavButtons = document.querySelectorAll(".add-fav");
addFavButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.textContent = "Added to Favorites";
    this.classList.add("added");
    this.disabled = true;
  });
});
