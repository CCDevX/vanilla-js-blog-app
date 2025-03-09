const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");
let isMenuOpen = false;
let mobileMenuDOM;

const createMobileMenu = () => {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

const closeMenu = () => {
  mobileMenuDOM.classList.remove("open");
};

const openMenu = () => {
  if (!mobileMenuDOM) {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add("open");
};

const toggleMobileMenu = () => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

iconMobile.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

window.addEventListener("click", (event) => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

window.addEventListener("resize", (event) => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
