//    let works = []

//    fetch("http://localhost:5678/api/works")
//   .then(response => response.json())
//   .then(data => {
//     works = data; 
//         for (let i= 0; i < data.length; i++) {

//         const work = works[i];
        
//           const gallery = document.querySelector(".gallery");
//           const figure = document.createElement("figure")

//           gallery.appendChild(figure)

//           const imageElement = document.createElement("img");
//           imageElement.src = work.imageUrl; 
//           figure.appendChild(imageElement); 

//           const titleElement = document.createElement("figcaption");
//           titleElement.textContent = work.title; 
//           figure.appendChild(titleElement); 
        
//         }
//     })
//     // .catch (error => console.error("Erreur :", error));

//     let buttons = document.querySelector(".buttons");
//     buttons.addEventListener("click",() => {
//       const workfilter = works.filter(function(work){
//     return work.category.name === "Objets";
//   });

//   console.log(workfilter);
// });

async function init() {
  const works = await fetch("http://localhost:5678/api/works").then(response => response.json());
  
  
  // GENERER tous les BOUTONS DYNAMIQUEMENT 

  // const divBouttons = document.querySelector(".buttons");
  //   function genererBoutons (){
  //           for (let i= 0; i < works.length; i++) {
      
  //           const work = works[i];
      
  //             const bouton = document.createElement("button");
  //             bouton.textContent = work.category.name; 
  //             divBouttons.appendChild(bouton);
  //     }
  //   }
  //   genererBoutons();

      // GENERER les BOUTONS DYNAMIQUEMENT sans doublons // revoir

  const divBouttons = document.querySelector(".buttons");
    function genererBoutons (){

    // ajout du bouton TOUS :
const buttonTous = document.createElement("button");
              buttonTous.textContent = "Tous"; 
              buttonTous.id = "tous";
              divBouttons.appendChild(buttonTous);

            for (let i= 0; i < 3; i++) {
      // i<3 à revoir meilleure solution ?
            const work = works[i];
      
              const bouton = document.createElement("button");
              bouton.textContent = work.category.name; 

    if (work.category.name === "Objets") {
      bouton.id = "objets";
    }
    else if (work.category.name === "Appartements") {
      bouton.id = "appartements";
    }
    else if (work.category.name === "Hotels & restaurants") {
      bouton.id = "hotelsrest";
    }
              divBouttons.appendChild(bouton);       
      }
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

    // deuxieme version FILTRES 
    

// const buttonObjets = document.querySelector("#objets");
// const buttonAppartements = document.querySelector("#appartements");
// const buttonHotelsRest = document.querySelector("#hotelsrest");
// const buttonTous = document.querySelector("#tous");

// // Fonction pour filtrer et générer les works
// function filtrer(categorie) {
//   if (categorie === "Tous") {
//     genererWorks(works);
//   } else {
//     const filteredWorks = works.filter(work => work.category.name === categorie);
//     genererWorks(filteredWorks);
//   }
// }

// // On ajoute les événements aux boutons
// buttonObjets.addEventListener("click", () => filtrer("Objets"));
// buttonAppartements.addEventListener("click", () => filtrer("Appartements"));
// buttonHotelsRest.addEventListener("click", () => filtrer("Hotels & restaurants"));
// buttonTous.addEventListener("click", () => filtrer("Tous"));
// }
//     init();