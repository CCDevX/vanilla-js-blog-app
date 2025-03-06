import "../assets/styles/styles.scss";
import "./form-article-style.scss";
import "../assets/javascripts/topbar.js";

const form = document.querySelector("form");
const errorUl = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());

  if (isFormValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/cc-blog-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.log("error : ", e);
    }
  } else {
  }
});

const isFormValid = (article) => {
  let isValid = true;
  errors = [];
  if (
    !article.author ||
    !article.img ||
    !article.category ||
    !article.title ||
    !article.content
  ) {
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
