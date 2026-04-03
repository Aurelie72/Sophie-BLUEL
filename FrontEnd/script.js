const urlCategories = "http://localhost:5678/api/categories";
const urlWorks = "http://localhost:5678/api/works";

let works = [];
let categories = [];

function genererWorks(works) {
  const gallery = document.querySelector(".gallery");

  gallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    figure.appendChild(imageElement);

    const titleElement = document.createElement("figcaption");
    titleElement.textContent = work.title;
    figure.appendChild(titleElement);
  }
}

const divBouttons = document.querySelector(".buttons");
function genererBoutons() {
  // ajout du bouton TOUS :
  const buttonTous = document.createElement("button");
  buttonTous.textContent = "Tous";
  buttonTous.id = "tous";
  divBouttons.appendChild(buttonTous);

  categories.forEach((categorie) => {
    const bouton = document.createElement("button");
    bouton.textContent = categorie.name;
    bouton.dataset.id = categorie.id;

    divBouttons.appendChild(bouton);
  });
}

function filters() {
  const allButtons = document.querySelectorAll(".buttons button");
  function resetButtons() {
    allButtons.forEach((btn) => {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
  }
  allButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetButtons();

      button.style.backgroundColor = "#1D6154";
      button.style.color = "white";

      const categoryId = button.dataset.id;

      if (!categoryId) {
        genererWorks(works);
      } else {
        const filteredWorks = works.filter(
          (work) => work.categoryId == categoryId,
        );
        genererWorks(filteredWorks);
      }
    });
  });
}

async function init() {
  categories = await fetch(urlCategories).then((response) => response.json());
  works = await fetch(urlWorks).then((response) => response.json());

  genererWorks(works);
  genererBoutons();
  filters();
}
init().then(() => {
  const token = localStorage.getItem("token");
  if (token) {
    editMode();
  }
});

function editMode() {
  if (document.querySelector("#edit-banner")) return;
  document.querySelector(".buttons").innerHTML = "";

  const header = document.querySelector("header");

  const section = document.createElement("section");
  section.id = "edit-banner";

  const pIcon = document.createElement("p");
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-pen-to-square";
  pIcon.appendChild(icon);

  const pText = document.createElement("p");
  pText.textContent = "Mode édition";

  section.appendChild(pIcon);
  section.appendChild(pText);

  header.prepend(section);

  document.body.classList.add("bandeau");

  const portfolioTitle = document.querySelector("#portfolio h2");

  const divEdit = document.createElement("div");
  divEdit.id = "edit";

  const pEditIcon = document.createElement("p");
  const iconEdit = document.createElement("i");
  iconEdit.className = "fa-solid fa-pen-to-square";
  pEditIcon.appendChild(iconEdit);

  const link = document.createElement("a");
  link.href = "#modal1";
  link.classList.add("js-modal");
  link.textContent = "Modifier";

  divEdit.appendChild(pEditIcon);
  divEdit.appendChild(link);

  portfolioTitle.insertAdjacentElement("afterend", divEdit);

  const h2 = document.querySelector("#portfolio h2");
  const edit = document.querySelector("#edit");
  const portfolio = document.querySelector("#portfolio");

  const divH2AndEdit = document.createElement("div");

  divH2AndEdit.style.display = "flex";
  divH2AndEdit.style.justifyContent = "center";
  divH2AndEdit.style.gap = "15px";
  divH2AndEdit.style.alignItems = "baseline";

  portfolio.insertAdjacentElement("afterbegin", divH2AndEdit);

  divH2AndEdit.appendChild(h2);
  divH2AndEdit.appendChild(divEdit);

  document.querySelector("#logbold").textContent = "logout";
  document.querySelector("#logbold").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    location.reload();
  });
  const ouvrirLaModal = document.querySelector(".js-modal");
  ouvrirLaModal.addEventListener("click", openModal);
}

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(
    e.target.closest(".js-modal").getAttribute("href"),
  );

  modalGallerySection.style.display = "block";
  modalAddPhoto.style.display = "none";

  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);

  genererModalGallery(works);

  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  if (e) e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});

const modalGallery = document.querySelector(".modal-gallery");

function genererModalGallery(works) {
  modalGallery.innerHTML = "";
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const figure = document.createElement("figure");
    modalGallery.appendChild(figure);

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can", "trash-icon");
    trash.dataset.id = work.id; //
    trash.addEventListener("click", deleteWork);

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    figure.appendChild(imageElement);
    figure.appendChild(trash);
  }
}

async function deleteWork(event) {
  try {
    const id = event.target.dataset.id;

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      works = works.filter((work) => work.id != id);
      genererWorks(works);
      genererModalGallery(works);
    } else {
      console.log("Erreur suppression");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
}

const modalGallerySection = document.querySelector("#modal-gallery");
const modalAddPhoto = document.querySelector("#modalAddPhoto");
const addPicture = document.querySelector("#addPicture");
const back = document.querySelector("#back");

addPicture.addEventListener("click", async (e) => {
  e.preventDefault();
  modalGallerySection.style.display = "none";
  modalAddPhoto.style.display = "block";

  await loadCategories();
});

back.addEventListener("click", (e) => {
  e.preventDefault();
  modalGallerySection.style.display = "block";
  modalAddPhoto.style.display = "none";
});

async function loadCategories() {
  const select = document.querySelector("#categorie");
  select.innerHTML = "";

  categories.forEach((categorie) => {
    const option = document.createElement("option");
    option.value = categorie.id;
    option.textContent = categorie.name;
    select.appendChild(option);
  });

  validateForm();
}

const titleInput = document.querySelector("#title-photo");
const categorieSelect = document.querySelector("#categorie");
const btnValidate = document.querySelector("#btn-Validate");

function validateForm() {
  const file = inputFile.files[0];
  const title = titleInput.value.trim();
  const categorie = categorieSelect.value;

  const isValid = file && title && categorie;
  if (isValid) {
    btnValidate.style.backgroundColor = "#1D6154";
    btnValidate.style.borderColor = "#1D6154";
  } else {
    btnValidate.style.backgroundColor = "#A7A7A7";
    btnValidate.style.borderColor = "#A7A7A7";
  }
  return isValid;
}

const uploadZone = document.querySelector("#upload-zone");
const inputFile = document.querySelector("#image");
const preview = document.querySelector("#preview");
const btnAddPhoto = document.querySelector("#btn-add-photo");

btnAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  preview.src = url;
  preview.style.display = "block";

  uploadZone.querySelector("i").style.display = "none";
  uploadZone.querySelector("button").style.display = "none";
  uploadZone.querySelector("p").style.display = "none";
});

const error = document.querySelector("#form-error");

function showFormError() {
  error.style.display = "flex";
  error.style.justifyContent = "center";
}

function hideFormError() {
  error.style.display = "none";
}

btnValidate.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showFormError();
  } else {
    hideFormError();
    sendNewWork();
  }
});

async function sendNewWork() {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorieSelect.value);

    const response = await fetch(urlWorks, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const newWork = await response.json();

      works.push(newWork);

      genererWorks(works);
      genererModalGallery(works);

      closeModal();
      resetForm();
    } else {
      alert("Erreur lors de l’envoi du projet.");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
}

inputFile.addEventListener("change", validateForm);
titleInput.addEventListener("input", validateForm);
categorieSelect.addEventListener("change", validateForm);

function resetForm() {
  inputFile.value = "";
  preview.src = "";
  preview.style.display = "none";

  uploadZone.querySelector("i").style.display = "block";
  uploadZone.querySelector("button").style.display = "block";
  uploadZone.querySelector("p").style.display = "block";

  titleInput.value = "";

  btnValidate.style.backgroundColor = "#A7A7A7";
  btnValidate.style.borderColor = "#A7A7A7";

  hideFormError();
}
