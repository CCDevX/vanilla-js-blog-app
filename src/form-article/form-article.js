import "../assets/styles/styles.scss";
import "./form-article-style.scss";
import "../assets/javascripts/topbar.js";

const form = document.querySelector("form");
const errorUl = document.querySelector("#errors");
const cancelBtn = document.querySelector(".btn-secondary");
let errors = [];
let articleId;

const fillForm = (article) => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");

  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");
  if (articleId) {
    const response = await fetch(
      `https://restapi.fr/api/cc-blog-posts/${articleId}`
    );
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
  }
};

initForm();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());

  if (isFormValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(
          `https://restapi.fr/api/cc-blog-posts/${articleId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: json,
          }
        );
      } else {
        response = await fetch("https://restapi.fr/api/cc-blog-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json,
        });
      }

      if (response.status < 300) {
        location.assign("/index.html");
      }
    } catch (e) {
      console.log("error : ", e);
    }
  } else {
  }
});

cancelBtn.addEventListener("click", (event) => {
  location.assign("/index.html");
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
