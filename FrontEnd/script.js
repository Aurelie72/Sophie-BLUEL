
let urlCategories = "http://localhost:5678/api/categories"
let urlWorks = "http://localhost:5678/api/works"

async function init() {
  const categories = await fetch(urlCategories).then(response => response.json());
  const works = await fetch(urlWorks).then(response => response.json());
  
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
    init();


