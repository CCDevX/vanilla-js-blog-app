import "../styles/_classes.scss";

const body = document.querySelector("body");
let calc;
let modal;
let cancel;
let confirm;

export function openModal(message) {
  createCalc();
  createModal(message);
  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    calc.addEventListener("click", (event) => {
      resolve(false);
      calc.remove();
    });

    cancel.addEventListener("click", (event) => {
      resolve(false);
      calc.remove();
    });

    confirm.addEventListener("click", (event) => {
      resolve(true);
      calc.remove();
    });
  });
}

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
};

const createModal = (message) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<p>${message}</p>`;
  cancel = document.createElement("button");
  confirm = document.createElement("button");
  cancel.innerText = "Annuler";
  confirm.innerText = "Confirmer";

  cancel.classList.add("btn", "btn-secondary");
  confirm.classList.add("btn", "btn-primary");
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.append(cancel, confirm);
};
