import "../assets/styles/styles.scss";
import "./form-article-style.scss";
import "../assets/javascripts/topbar.js";

const form = document.querySelector("form");
const errorUl = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());

  if (isFormValid(article)) {
    const json = JSON.stringify(article);
  } else {
  }
});

const isFormValid = (article) => {
  let isValid = true;
  errors = [];
  if (!article.author || !article.category || !article.content) {
    errors.push("Vous devez renseigner tous les champs");
    isValid = false;
  }

  if (!isValid) {
    let errorHTML = "";
    errors.map((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorUl.innerHTML = errorHTML;
  } else {
    errorUl.innerHTML = "";
  }

  return isValid;
};
