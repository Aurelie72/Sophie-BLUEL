let urlLogin = "http://localhost:5678/api/users/login";

function logInForm() {
  const logIn = document.querySelector("#login");

  logIn.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    try {
      const response = await fetch(urlLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // = ce que je tenvoi cest du json
        body: JSON.stringify({
          // donc pour le trasnformer en json
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        window.location.href = "index.html";
      } else {
        let errorMessage = document.querySelector(".error-message");

        if (!errorMessage) {
          errorMessage = document.createElement("p");
          errorMessage.classList.add("error-message");
          document.querySelector("#login").appendChild(errorMessage);
        }
        errorMessage.textContent =
          "Erreur dans l’identifiant ou le mot de passe";
      }
    } catch (error) {
      console.error(error);

      let errorMessage = document.querySelector(".error-message");

      if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        document.querySelector("#login").appendChild(errorMessage);
      }

      errorMessage.textContent = "Une erreur est survenue.";
    }
  });
}
logInForm();

const logbold = document.getElementById("logbold");
logbold.style.fontWeight = "bold";
