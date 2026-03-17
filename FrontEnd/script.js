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

    // FILTRES 

  function filtres () {
  let buttonObjet = document.querySelector(".buttons #objets");
  buttonObjet.addEventListener("click",() => {
   const workfilted = works.filter(function (work) {
    return work.category.name === "Objets";  
 } ) 
  genererWorks(workfilted);
  })

let buttonAppartement = document.querySelector(".buttons #appartements");
buttonAppartement.addEventListener("click",() => {
const workfilted = works.filter(function (work) {
return work.category.name === "Appartements"; 
 } ) 
genererWorks(workfilted);
  })

   let buttonHotelsRest = document.querySelector(".buttons #hotelsrest");
buttonHotelsRest.addEventListener("click",() => {
const workfilted = works.filter(function (work) {
return work.category.name === "Hotels & restaurants"; 
 } ) 
genererWorks(workfilted);
  })

 let buttonTous = document.querySelector(".buttons #tous");
buttonTous.addEventListener("click",() => {
genererWorks(works)
  });
   
}

// Initialiser : les works, catégories et filtres : 

async function init() {
 categories = await fetch(urlCategories).then(response => response.json());
 works = await fetch(urlWorks).then(response => response.json());

 genererWorks(works)
 genererBoutons();
 filtres ()
}
  init().then(() => {
 const token = localStorage.getItem("token");
 if (token) {
  modeEdition();
 }
});

function modeEdition () {

document.querySelector(".buttons").innerHTML= ""
document.querySelector("header").insertAdjacentHTML(
  "afterbegin", 
  // car sinon avec inner efface le contenu et met le bandeau apres sophie 
    `<section id="bandeaunoir">
    <p><i class="fa-solid fa-pen-to-square"></i></p>
    <p>Mode édition</p>
    </section>
 `);
 document.body.classList.add("bandeau");
document.querySelector("#portfolio h2").insertAdjacentHTML(
  "afterend",
 `<div id="modifier">
   <p><i class="fa-solid fa-pen-to-square"></i></p>
   <a href="#modale1" class="js-modal">Modifier</a>
 </div>`
 );

 // DONNER DU STYLE VIA JS / POUR TITRE <section id="portfolio"> : **************
const h2 = document.querySelector("#portfolio h2");
const modifier = document.querySelector("#modifier");
const portfolio = document.querySelector("#portfolio");

const conteneurH2EtModifier = document.createElement("div")

conteneurH2EtModifier.style.display = "flex";
conteneurH2EtModifier.style.justifyContent = "center";
conteneurH2EtModifier.style.gap = "15px";
// aligner parfaitement malgres différente taille de police :
conteneurH2EtModifier.style.alignItems = "baseline"; 

// portfolio.appendChild(conteneurH2EtModifier); pour le mettre au debut :
portfolio.insertAdjacentElement("afterbegin", conteneurH2EtModifier);

conteneurH2EtModifier.appendChild(h2);
conteneurH2EtModifier.appendChild(modifier);

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


// MODALE *********************************************************************************

let modal = null

const openModal= function(e){
  e.preventDefault()
  // const target= document.querySelector(e.target.getAttribute("href")) a modifier car si je clique a cote ca fonctionne pas 
  modal = document.querySelector(e.target.closest(".js-modal").getAttribute("href"))

    // Réinitialisation de la modale
  modalGallerySection.style.display = "block";
  modalAjoutPhoto.style.display = "none";


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


// fonction image dans modale :

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

// SUPPRIMER WORKS dans la modale :

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
    // recharger la galerie modale
    genererModalGallery(works);

  } else {
    console.log("Erreur suppression");
  }
}


    // Modale Partie 2 Ajout de Photo ********************************************************
const modalGallerySection = document.querySelector("#modal-gallery");
const modalAjoutPhoto = document.querySelector("#modalajoutphoto");
const ajouterPhoto = document.querySelector("#ajouterPhoto");
const retourgalerie = document.querySelector("#retourgalerie");

ajouterPhoto.addEventListener("click", async (e) => {
  e.preventDefault(); //pas obligé car i ne fait pas daction 
  modalGallerySection.style.display = "none";
  modalAjoutPhoto.style.display = "block";

  await loadCategories();
});

retourgalerie.addEventListener("click",(e)=>{
  e.preventDefault();
   modalGallerySection.style.display = "block";
  modalAjoutPhoto.style.display = "none";
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

  // Revalider le formulaire après chargement des catégories
  validateForm();
}

// PREVIEW PHOTO *******************************************************************

// --- AJOUT PHOTO : INPUT FILE + PREVIEW ---

const uploadZone = document.querySelector("#upload-zone");
const inputFile = document.querySelector("#image");
const preview = document.querySelector("#preview");
const btnAddPhoto = document.querySelector("#btn-add-photo");

// Ouvre l'explorateur de fichiers
btnAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  inputFile.click();
});

// Affiche la preview et masque uniquement le contenu interne
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  // Afficher la preview
  preview.src = url;
  preview.style.display = "block";

  // Masquer uniquement les éléments internes du cadre gris
  uploadZone.querySelector("i").style.display = "none";
  uploadZone.querySelector("button").style.display = "none";
  uploadZone.querySelector("p").style.display = "none";
});

function showFormError() {
  const error = document.querySelector("#form-error");
  error.style.display = "block";
}

function hideFormError() {
  const error = document.querySelector("#form-error");
  error.style.display = "none";
}

// --- VALIDATION DU FORMULAIRE ---

const titreInput = document.querySelector("#titre-photo");
const categorieSelect = document.querySelector("#categorie");
const btnValider = document.querySelector("#btn-valider");

function validateForm() {
  const file = inputFile.files[0];
  const titre = titreInput.value.trim();
  const categorie = categorieSelect.value;

  const isValid = file && titre && categorie;

  return isValid;
}

btnValider.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showFormError();
    return;
  }

  hideFormError();
  envoyerNouveauProjet(); // étape suivante
});

// --- ENVOYER LE NOUVEAU PROJET À L’API ---

async function envoyerNouveauProjet() {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", inputFile.files[0]);
  formData.append("title", titreInput.value);
  formData.append("category", categorieSelect.value);

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

    // Fermer la modale
    closeModal();
// obligatoire ?
    resetForm();

  } else {
    alert("Erreur lors de l’envoi du projet.");
  }
}

// Vérifier à chaque changement
inputFile.addEventListener("change", validateForm);
titreInput.addEventListener("input", validateForm);
categorieSelect.addEventListener("change", validateForm);



function resetForm() {
  // Réinitialiser l’input file
  inputFile.value = "";
  preview.src = "";
  preview.style.display = "none";

  // Réafficher les éléments internes du cadre gris
  uploadZone.querySelector("i").style.display = "block";
  uploadZone.querySelector("button").style.display = "block";
  uploadZone.querySelector("p").style.display = "block";

  // Réinitialiser les champs texte et select
  titreInput.value = "";

  // Désactiver le bouton Valider
  btnValider.disabled = true;

  // Cacher le message d’erreur
  hideFormError();
}