// je crée des variables pour mes liens :
let urlCategories = "http://localhost:5678/api/categories"
let urlWorks = "http://localhost:5678/api/works"

// pour que works et catégories existe en dehors de mes fonctions et pouvoir les réutiliser, globales 
let works = [];
let categories = [];

// Afficher les works :
function genererWorks(works){
 const gallery = document.querySelector(".gallery");

 gallery.innerHTML = "";

 for (let i = 0; i < works.length; i++) {
 const work = works[i];

  // ou works.forEach(function(work){ ou works.forEach(work => {

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

    // GENERER les BOUTONS DYNAMIQUEMENT sans doublons 

 const divBouttons = document.querySelector(".buttons");
  function genererBoutons (){

  // ajout du bouton TOUS :
const buttonTous = document.createElement("button");
       buttonTous.textContent = "Tous"; 
       buttonTous.id = "tous";
       divBouttons.appendChild(buttonTous);

 categories.forEach(categorie => {
 const bouton = document.createElement("button");
 bouton.textContent = categorie.name;

 // ou bouton.dataset.id = categorie.id;

  if (categorie.name === "Objets") {
   bouton.id = "objets";
  }
  else if (categorie.name === "Appartements") {
   bouton.id = "appartements";
  }
  else if (categorie.name === "Hotels & restaurants") {
   bouton.id = "hotelsrest";
  }
       divBouttons.appendChild(bouton);    
   });
  }

    // filters 

  function filters () {

      function resetButtons() {
    const allButtons = document.querySelectorAll(".buttons button");
    allButtons.forEach(btn => {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
  }
  let buttonObjet = document.querySelector(".buttons #objets");
  buttonObjet.addEventListener("click",() => {
   const filteredWorks = works.filter(function (work) {
    resetButtons()
     buttonObjet.style.backgroundColor = "#1D6154"
     buttonObjet.style.color = "white";
    return work.category.name === "Objets";  
 } ) 
  genererWorks(filteredWorks);
  })

let buttonAppartement = document.querySelector(".buttons #appartements");
buttonAppartement.addEventListener("click",() => {
const filteredWorks = works.filter(function (work) {
  resetButtons()
   buttonAppartement.style.backgroundColor = "#1D6154"
   buttonAppartement.style.color = "white";
return work.category.name === "Appartements"; 
 } ) 
genererWorks(filteredWorks);
  })

   let buttonHotelsRest = document.querySelector(".buttons #hotelsrest");
buttonHotelsRest.addEventListener("click",() => {
const filteredWorks = works.filter(function (work) {
  resetButtons()
  buttonHotelsRest.style.backgroundColor = "#1D6154"
  buttonHotelsRest.style.color = "white";
return work.category.name === "Hotels & restaurants"; 
 } ) 
genererWorks(filteredWorks);
  })

 let buttonTous = document.querySelector(".buttons #tous");
buttonTous.addEventListener("click",() => {
  resetButtons()
  buttonTous.style.backgroundColor = "#1D6154"
   buttonTous.style.color = "white";
genererWorks(works)
  });
}

// Initialiser : les works, catégories et filters : 

async function init() {
 categories = await fetch(urlCategories).then(response => response.json());
 works = await fetch(urlWorks).then(response => response.json());

 genererWorks(works)
 genererBoutons();
 filters ()
}
  init().then(() => {
 const token = localStorage.getItem("token");
 if (token) {
  editMode();
 }
});



function editMode () {

document.querySelector(".buttons").innerHTML= ""
document.querySelector("header").insertAdjacentHTML(
  "afterbegin", 
  // car sinon avec inner efface le contenu et met le bandeau apres sophie 
    `<section id="edit-banner">
    <p><i class="fa-solid fa-pen-to-square"></i></p>
    <p>Mode édition</p>
    </section>
 `);
 document.body.classList.add("bandeau");
document.querySelector("#portfolio h2").insertAdjacentHTML(
  "afterend",
 `<div id="edit">
   <p><i class="fa-solid fa-pen-to-square"></i></p>
   <a href="#modal1" class="js-modal">Modifier</a>
 </div>`
 );

//  si je veux mode edition seulement sur pc :
//  if (window.innerWidth >= 1024) {
//   activereditMode();
// }

 // DONNER DU STYLE VIA JS / POUR title <section id="portfolio"> : **************
const h2 = document.querySelector("#portfolio h2");
const edit = document.querySelector("#edit");
const portfolio = document.querySelector("#portfolio");

const divH2AndEdit = document.createElement("div")

divH2AndEdit.style.display = "flex";
divH2AndEdit.style.justifyContent = "center";
divH2AndEdit.style.gap = "15px";
// aligner parfaitement malgres différente taille de police :
divH2AndEdit.style.alignItems = "baseline"; 

// portfolio.appendChild(divH2AndEdit); pour le mettre au debut :
portfolio.insertAdjacentElement("afterbegin", divH2AndEdit);

divH2AndEdit.appendChild(h2);
divH2AndEdit.appendChild(edit);

// ************************************************************************************

document.querySelector("#logbold").innerHTML= `logout`
document.querySelector("#logbold").addEventListener("click", (e) => {
 e.preventDefault();
 localStorage.removeItem("token");
 location.reload(); 
 // window.location.reload();
 // window.location.href = "index.html";
});
// document.querySelectorAll(".js-modal").forEach(a => {
//  a.addEventListener("click", openModal)
// });
// // jai un seul js modal alors par besoinde for each
 const ouvrirLaModal = document.querySelector(".js-modal");
ouvrirLaModal.addEventListener("click", openModal);

}


// modal *********************************************************************************

let modal = null

const openModal= function(e){
  e.preventDefault()
  // const target= document.querySelector(e.target.getAttribute("href")) a modifier car si je clique a cote ca fonctionne pas 
  modal = document.querySelector(e.target.closest(".js-modal").getAttribute("href"))

    // Réinitialisation de la modal
  modalGallerySection.style.display = "block";
  modalAddPhoto.style.display = "none";


  // pour retirer le display none qui cache au depart : 
  modal.style.display = null
  modal.removeAttribute("aria-hidden")
  modal.setAttribute("aria-modal",true )
 
  genererModalGallery(works);

  modal.addEventListener("click", closeModal)
  modal.querySelector(".js-modal-close").addEventListener('click',closeModal)
  modal.querySelector(".js-modal-stop").addEventListener('click',stopPropagation)
};

const closeModal = function(e){
  if (modal === null) return
   if (e) e.preventDefault();
  modal.style.display = "none"
  modal.setAttribute("aria-hidden", true)
  modal.removeAttribute("aria-modal")
  modal.removeEventListener("click", closeModal)
  modal.querySelector(".js-modal-close").removeEventListener('click',closeModal)
  modal.querySelector(".js-modal-stop").removeEventListener('click',stopPropagation)
  modal = null
}

const stopPropagation = function (e){
  e.stopPropagation()
}

// fermer la modal avec esc :

window.addEventListener("keydown", function(e){
  if(e.key === "Escape" || e.key === "Esc"){
    closeModal();
  }
});


// fonction image dans modal :

    const modalGallery = document.querySelector(".modal-gallery");

  function genererModalGallery(works){
modalGallery.innerHTML = "";
        for (let i= 0; i < works.length; i++) {

        const work = works[i];

          const figure = document.createElement("figure")
          modalGallery.appendChild(figure)

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
// *************************************************************************************

// SUPPRIMER WORKS dans la modal :

async function deleteWork(event) {
  const id = event.target.dataset.id;

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (response.ok) {
    // supprimer du tableau works
    works = works.filter(work => work.id != id);
    // recharger la galerie principale
    genererWorks(works);
    // recharger la galerie modal
    genererModalGallery(works);

  } else {
    console.log("Erreur suppression");
  }
}


    // modal Partie 2 Ajout de Photo ********************************************************
const modalGallerySection = document.querySelector("#modal-gallery");
const modalAddPhoto = document.querySelector("#modalAddPhoto");
const addPicture = document.querySelector("#addPicture");
const back = document.querySelector("#back");

addPicture.addEventListener("click", async (e) => {
  e.preventDefault(); //pas obligé car i ne fait pas daction 
  modalGallerySection.style.display = "none";
  modalAddPhoto.style.display = "block";

  await loadCategories();
});

back.addEventListener("click",(e)=>{
  e.preventDefault();
   modalGallerySection.style.display = "block";
  modalAddPhoto.style.display = "none";
}
);

// --- CHARGER LES CATÉGORIES DANS LE SELECT ---

async function loadCategories() {
  const select = document.querySelector("#categorie");
  select.innerHTML = ""; 

  // const response = await fetch(urlCategories); pas besoin car déja fait dans init 
  // const categories = await response.json(); finalement jai fait une variable globale donc pas besoin 

//   // Option vide qui sera sélectionnée par défaut
// const emptyOption = document.createElement("option");
// emptyOption.value = "";      // valeur vide
// emptyOption.textContent = "-- Choisir une catégorie --"; 
// emptyOption.selected = true; // sélectionnée par défaut
// emptyOption.disabled = true; // option non sélectionnable après choix
// select.appendChild(emptyOption);

  categories.forEach(categorie => {
    const option = document.createElement("option");
    option.value = categorie.id; 
    option.textContent = categorie.name;
    select.appendChild(option);
  });

    //pour Sélectionner automatiquement la première catégorie, sseulement si créé en html si en js alors il le fait tout seul 
  // select.selectedIndex = 0;

  // ReValidate le formulaire après chargement des catégories
  validateForm();
}

// --- VALIDATION DU FORMULAIRE ---
const titleInput = document.querySelector("#title-photo");
const categorieSelect = document.querySelector("#categorie");
const btnValidate = document.querySelector("#btn-Validate");

function validateForm() {
  const file = inputFile.files[0];
  const title = titleInput.value.trim(); // trim cest pour retirer les espaces
  const categorie = categorieSelect.value;

  const isValid = file && title && categorie;
  if(isValid){
    btnValidate.style.backgroundColor = "#1D6154";
    btnValidate.style.borderColor = "#1D6154";
  } else {
  btnValidate.style.backgroundColor = "#A7A7A7";
  btnValidate.style.borderColor = "#A7A7A7";
  }
  return isValid;
}

// --- AJOUT PHOTO : INPUT FILE + PREVIEW ---*******************************************************************
                        // A revoir *********
                        

const uploadZone = document.querySelector("#upload-zone");
const inputFile = document.querySelector("#image");
const preview = document.querySelector("#preview");
const btnAddPhoto = document.querySelector("#btn-add-photo");

// jouvre l'explorateur de fichiers
btnAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  // je déclenche manuellement le clique sur inputFile :
  inputFile.click();
});

// Affiche la preview et masque uniquement le contenu interne
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  //   Quand l’utilisateur choisit un fichier via ton <input type="file">, le navigateur stocke les fichiers sélectionnés dans une liste appelée inputFile.files.
  // inputFile.files → c’est une FileList, une sorte de tableau.
// inputFile.files[0] → c’est le premier fichier choisi.
// const file = … → tu récupères ce fichier dans une variable pour pouvoir l’utiliser.
  if (!file) return;

//   Le navigateur bloque l’accès direct aux fichiers locaux pour des raisons de sécurité.
// Donc il te donne une fausse URL, mais qui pointe vers une copie du fichier en mémoire.
  const url = URL.createObjectURL(file);

                        // ******************

  // Afficher la preview
  preview.src = url;
  preview.style.display = "block";

  // Masquer uniquement les éléments internes du cadre gris
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
  // const error = document.querySelector("#form-error");
  error.style.display = "none";
}

btnValidate.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    showFormError();
  }
  else{
    hideFormError();
    sendNewWork(); 
  }
});

// --- send LE NOUVEAU PROJET À L’API ---

async function sendNewWork() {
  const token = localStorage.getItem("token");
  
  const formData = new FormData();   //la syntaxe pour fabriquer un objet basé sur une classe.
  formData.append("image", inputFile.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categorieSelect.value);
  // append() sert à ajouter un champ dans un objet 
  
  const response = await fetch(urlWorks, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });
  
  if (response.ok) {
    const newWork = await response.json();

    // Ajouter dans ton tableau works
    works.push(newWork);

    // Rafraîchir les galeries
    genererWorks(works);
    genererModalGallery(works);

    closeModal();
    resetForm();

  } else {
    alert("Erreur lors de l’envoi du projet.");
  }
}

// Vérifier à chaque changement
// Tu appelles validateForm à chaque fois pour vérifier si le formulaire est complet.
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

