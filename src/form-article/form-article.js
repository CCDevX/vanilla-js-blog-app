import "../assets/styles/styles.scss";
import "./form-article-style.scss";
import "../assets/javascripts/topbar.js";

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
