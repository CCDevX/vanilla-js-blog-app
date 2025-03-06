import "./index.scss";
import "./assets/styles/styles.scss";
import "./assets/javascripts/topbar.js";

const articleContainer = document.querySelector(".articles-container");

const addArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    console.log(article);
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
      <img
              src="${article.img}"
              alt="profile"
            />
            <h2>${article.title}</h2>
            <div class="article-author">${article.author} - ${article.category}</div>
            <p class="article-content">
              ${article.content}
            </p>
            <div class="article-actions">
              <button class="btn btn-danger" data-id="${article._id}">Supprimer</button>
              <button class="btn btn-primary">Modifier</button>
            </div>
      `;

    return articleDOM;
  });
  articleContainer.innerHTML = "";
  articleContainer.append(...articlesDOM);
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/cc-blog-posts", {
      method: "GET",
    });
    const articles = await response.json();
    addArticles(articles);
  } catch (e) {
    console.log("error : ", e);
  }
};

fetchArticles();
