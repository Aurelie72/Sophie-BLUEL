
let urlCategories = "http://localhost:5678/api/categories"
let urlWorks = "http://localhost:5678/api/works"

let works = [];
// pour que works existe en dehors de ma fonction init 

async function init() {
  const categories = await fetch(urlCategories).then(response => response.json());
  works = await fetch(urlWorks).then(response => response.json());
  
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
    genererBoutons();

   
    // GENERER LES TRAVAUX DYNAMIQUEMENT / 
    const gallery = document.querySelector(".gallery");

  function genererWorks(works){
gallery.innerHTML = "";
        for (let i= 0; i < works.length; i++) {

        const work = works[i];

          const figure = document.createElement("figure")
          gallery.appendChild(figure)

          const imageElement = document.createElement("img");
          imageElement.src = work.imageUrl; 
          figure.appendChild(imageElement); 

          const titleElement = document.createElement("figcaption");
          titleElement.textContent = work.title; 
          figure.appendChild(titleElement); 
        }
    }
    genererWorks(works);

    // FILTRES 

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
    init().then(() => {
  const token = localStorage.getItem("token");
  if (token) {
    modeEdition();
  }
});

function modeEdition () {
  // const token = localStorage.getItem("token");
  // if (!token) return; // si pas connecté, on ne fait rien

document.querySelector(".buttons").innerHTML= ""
document.querySelector("header").insertAdjacentHTML(
    "afterbegin", 
    // car sinon avec inner efface le contenu et met le bandeau apres sophie 
        `<section id="bandeaunoir">
        <p><i class="fa-solid fa-pen-to-square"></i></p>
        <p>Mode édition</p>
        </section>
  `);
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




 document.querySelector("#logbold").innerHTML= `Logout`
 document.querySelector("#logbold").addEventListener("click", () => {
  localStorage.removeItem("token");
  // window.location.reload();
  // window.location.href = "index.html";
});
document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal)
});
}

// MODALE 

let modal = null

const openModal= function(e){
  e.preventDefault()
  // const target= document.querySelector(e.target.getAttribute("href")) a modifier car si je clique a cote ca fonctionne pas 
  const target = document.querySelector(e.target.closest(".js-modal").getAttribute("href"))

    // Réinitialisation de la modale
  modalGallerySection.style.display = "block";
  modalAjoutPhoto.style.display = "none";

  // pour retirer le display none qui cache au depart : 
  target.style.display = null
  target.removeAttribute("aria-hidden")
  target.setAttribute("aria-modal",true )
  modal = target

  genererModalGallery(works);

  modal.addEventListener("click", closeModal)
  modal.querySelector(".js-modal-close").addEventListener('click',closeModal)
  modal.querySelector(".js-modal-stop").addEventListener('click',stopPropagation)
};

const closeModal = function(e){
  if (modal === null) return
  e.preventDefault()
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

document.querySelectorAll(".js-modal").forEach(a=>{
  a.addEventListener("click",openModal)
});




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
    trash.dataset.id = work.id; // ← indispensable
trash.addEventListener("click", deleteWork); // ← on attache l’event ici

          const imageElement = document.createElement("img");
          imageElement.src = work.imageUrl; 
           figure.appendChild(imageElement);
    figure.appendChild(trash);
        }
    }



    // modale ajout de photo 
const modalGallerySection = document.querySelector("#modal-gallery");
const modalAjoutPhoto = document.querySelector("#modalajoutphoto");
const ajouterPhoto = document.querySelector("#ajouterPhoto");
const retourgalerie = document.querySelector("#retourgalerie");

ajouterPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  modalGallerySection.style.display = "none";
  modalAjoutPhoto.style.display = "block";
});

retourgalerie.addEventListener("click",(e)=>{
  e.preventDefault();
   modalGallerySection.style.display = "block";
  modalAjoutPhoto.style.display = "none";
}
);



// supprimer works 

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

// async function envoyerNouveauProjet(file, title, categoryId) {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("image", file);
//   formData.append("title", title);
//   formData.append("category", categoryId);

//   const response = await fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     },
//     body: formData
//   });

//   if (response.ok) {
//     const newWork = await response.json();

//     // Ajouter dans ton tableau works
//     works.push(newWork);

//     // Rafraîchir les galeries
//     genererWorks(works);
//     genererModalGallery(works);

//     // Fermer la modale
//     closeModal();

//   } else {
//     alert("Erreur lors de l’envoi du projet.");
//   }
// }

