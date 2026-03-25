// LOGIN 

let urlLogin = "http://localhost:5678/api/users/login"

function logInForm() {

  const logIn = document.querySelector("#login");

  logIn.addEventListener("submit", async function (event) {
    // event est un objet créé automatiquement par le navigateur à chaque fois qu’un événement se produit.
    // ne pas recharger la page : 
    event.preventDefault();

    // console.log(event)

    // je récupère la valeur :
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    try {

      // requête POST vers l'API :
      const response = await fetch(urlLogin, {
        method: "POST",
        // pour dire au back end ce que je tenvoies c'est du json : 
        headers: { "Content-Type": "application/json" },
        // Cet objet avis doit être converti en une chaîne de caractères au format JSON pour être transmis dans le body de la requête. Nous appelons donc la fonction JSON.stringify :
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        })
      });

      // conversion de la réponse en JSON :
      const data = await response.json();
    //   console.log(data)

    //   propriété reponse.ok revoi true or false : 
     if (response.ok) {

//         La fonction setItem permet d’écrire une valeur dans le localStorage. Elle prend deux arguments :
// la clé : une chaîne de caractères ;
// la valeur à enregistrer : une chaîne de caractères.
// ex : Pour stocker la phrase “Les Bonnes Pièces !” avec la clé “nom”, on écrira donc :
// window.localStorage.setItem("nom", "Les Bonnes Pièces !");localStorage.setItem(nom, valeur);

        localStorage.setItem("token", data.token);

        // window pas besoin car implicite 

        // Redirection vers l'accueil
        window.location.href = "index.html";
      }
      else {

  // on vérifie si un message existe déjà : on ne peut pas le rappeler car il nexiste pas , permet deviter davoir plusieurs fois le message derreur 
  let errorMessage = document.querySelector(".error-message");

  // s'il n'existe pas, on le crée : ! c'est linverse
  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    document.querySelector("#login").appendChild(errorMessage);
  }
  // on met le texte dedans
  errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
}
    } catch (error) {
  console.error(error);

  let errorMessage = document.querySelector(".error-message");

  // Si l'élément n'existe pas, on le crée
  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    document.querySelector("#login").appendChild(errorMessage);
  }

  // On met le texte dedans
  errorMessage.textContent = "Une erreur est survenue.";
}
  });
}
logInForm()

// Style login en gras : 
const logbold = document.getElementById("logbold");
logbold.style.fontWeight = "bold";

