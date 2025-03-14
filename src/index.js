import "./index.scss";
import "./assets/styles/styles.scss";
import "./assets/javascripts/topbar.js";
import { openModal } from "./assets/javascripts/modal.js";

const articleContainer = document.querySelector(".articles-container");
const categoriesMenu = document.querySelector(".categories");
const select = document.querySelector("select");
let filter;
let articles;
let sortBy = "desc";

select.addEventListener("change", (event) => {
  sortBy = select.value;
  fetchArticles();
});

const addArticles = () => {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => {
      console.log(article);
      const articleDOM = document.createElement("div");
      articleDOM.classList.add("article");
      articleDOM.innerHTML = `
      <img
              src="${article.img}"
              alt="profile"
            />
            <h2>${article.title}</h2>
            <div class="article-author">${article.author} - ${new Date(
        article.createdAt
      ).toLocaleDateString("fr-Fr", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</div>
            <p class="article-content">
              ${article.content}
            </p>
            <div class="article-actions">
              <button class="btn btn-danger" data-id="${
                article._id
              }">Supprimer</button>
              <button class="btn btn-primary" data-id="${
                article._id
              }">Modifier</button>
            </div>
      `;

      return articleDOM;
    });
  articleContainer.innerHTML = "";
  articleContainer.append(...articlesDOM);
  const deleteButtons = articleContainer.querySelectorAll(".btn-danger");
  const editButtons = articleContainer.querySelectorAll(".btn-primary");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form-article/form-article.html?id=${articleId}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      //const choice = await
      console.log("delete");
      openModal("Êtes-vous sûr de vouloir supprimer cet article ?");

      /* if (choice) {
        const target = event.target;
        const articleId = target.dataset.id;
        try {
          const response = await fetch(
            `https://restapi.fr/api/cc-blog-posts/${articleId}`,
            {
              method: "DELETE",
            }
          );
          fetchArticles();
        } catch (e) {
          console.log("error : ", e);
        }
      } */
    });
  });
};

const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem[0]} { <strong>${categoryElem[1]}</strong> }`;
    if (categoryElem[0] === filter) {
      li.classList.add("active");
    }
    li.addEventListener("click", (event) => {
      if (filter === categoryElem[0]) {
        filter = null;
        li.classList.remove("active");
      } else {
        filter = categoryElem[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
      }
      addArticles();
    });
    return li;
  });
  categoriesMenu.innerHTML = "";
  categoriesMenu.append(...liElements);
};

const createMenuCategory = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
    } else {
      acc[article.category] = 1;
    }
    return acc;
  }, {});

  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => {
      return c1[0].localeCompare(c2[0]);
    });

  displayMenuCategories(categoriesArr);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/cc-blog-posts?sort=createdAt:${sortBy}`,
      {
        method: "GET",
      }
    );
    articles = await response.json();
    addArticles();
    createMenuCategory();
  } catch (e) {
    console.log("error : ", e);
  }
};

fetchArticles();
