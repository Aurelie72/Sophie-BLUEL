    fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
        for (let i= 0; i < data.length; i++) {

          const works = data[i];
          const imageElement = document.createElement("img");
          imageElement.src = works.imageUrl; 
          document.body.appendChild(imageElement); 

          const titleElement = document.createElement("figcaption");
          titleElement.textContent = works.title; 
          document.body.appendChild(titleElement); 
        
        }
    })
    .catch (error => console.error("Erreur :", error));
