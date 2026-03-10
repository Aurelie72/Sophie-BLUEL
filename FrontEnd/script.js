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

    // Creation des autres boutons via categories :
            // for (let i= 0; i < categories.length; i++) {
            // const categorie = categories[i];
      
            //   const bouton = document.createElement("button");
            //   bouton.textContent = categorie.name; 
              
              // ou 
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

    // creation categorie a partir de works : erreur 
  // for (let i= 0; i < 3; i++) {
    //             const work = works[i];
      
    //           const bouton = document.createElement("button");
    //           bouton.textContent = work.category.name; 

    // if (work.category.name === "Objets") {
    //   bouton.id = "objets";
    // }
    // else if (work.category.name === "Appartements") {
    //   bouton.id = "appartements";
    // }
    // else if (work.category.name === "Hotels & restaurants") {
    //   bouton.id = "hotelsrest";
    // }
    //           divBouttons.appendChild(bouton);       
    //   }
    // }
    // genererBoutons();
    
    
    
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

    // avec innerHTML : 
//     genererWorks(works);

//     function genererWorks(works) {
//   gallery.innerHTML = works.map(work => 
// map prend une fonction qui reçoit chaque élément du tableau (work)
                        // et doit retourner quelque chose (ici, une string HTML).
                        // Donc :
                        // work = un élément du tableau works
                        // => = “retourne”
                        // la string entre backticks = ce que tu veux générer pour chaque élément`
  //  <figure>
  // //  <img src="${work.imageUrl}" alt="${work.title}">
  //    <figcaption>${work.title}</figcaption>
  //  </figure>
  //  `).join("");               
                        // join sert à coller les éléments d’un tableau en une seule string.
                        // Tu choisis ce que tu mets entre chaque élément :
                        // join("") → rien entre les éléments
                        // join(",") → une virgule
                        // join("\n") → un retour à la ligne
// }
// genererWorks(works);
  

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




// LOGIN 

export function formulaireLogIn() {

   const logIn = document.querySelector("#login");
   logIn.addEventListener("submit", function (event) {
  event.preventDefault();

  
  const emailValue = document.querySelector("#email").value
  const passwordValue = document.querySelector("#password").value


fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Cet objet avis doit être converti en une chaîne de caractères au format JSON pour être transmis dans le body de la requête. Nous appelons donc la fonction JSON.stringify : 
    body: JSON.stringify({
    email: emailValue,
    password: passwordValue
    })
  });
 });
}
formulaireLogIn()




// corrigé : 
export function formulaireLogIn() {

  const logIn = document.querySelector("#login");

  logIn.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        })
      });

      // const data = await response.json();

    //   if (response.ok) {
    //     // Stocker le token
    //     localStorage.setItem("token", data.token);

    //     // Redirection vers l'accueil
    //     window.location.href = "index.html";
    //   } else {
    //     document.querySelector(".error-message").textContent =
    //       "Email ou mot de passe incorrect";
    //   }

    // } catch (error) {
    //   console.error(error);
    //   document.querySelector(".error-message").textContent =
    //     "Une erreur est survenue.";
    }
  });
}

formulaireLogIn();

