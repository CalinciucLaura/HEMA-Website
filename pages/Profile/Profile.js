const plantName = localStorage.getItem("plant");
const divElement = document.getElementById("favorites");

//console.log(plantName);

// Verifică dacă plantName există și nu este gol
if (plantName) {
  // Transformă plantName într-un array de obiecte (presupunând că este în format JSON)
  const plantArray = JSON.parse(plantName);

  let html = "";

  // // Iterează prin fiecare obiect din plantArray și construiește elementele HTML
  // plantArray.forEach((element) => {
  //   html += `<div class="PLANT-BOX" style="margin:30px">
  //     <img src="../../images/Main/${element.name.replace(/\s/g, "")}.jpg" />
  //     <div class="TEXT-BOX" >
  //         <h3>${element.name}</h3>
  //           <p>${element.description}</p>
  //     </div>
  //   </div>`;
  // });

  // Adaugă html generat în divElement
  divElement.innerHTML = html;
}

localStorage.removeItem("plant");

document
  .getElementById("showMyCollection")
  .addEventListener("click", function () {
    fetch("/api/showMyCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Plantele tale sunt", data.rows);

        let resultsDiv = document.getElementById("COLLECT");
        let htmlString = "";

        if (data.rows.length == 0) {
          htmlString += "<h2>Sorry, your collection is empty :(</h2>";
        } else {
          data.rows.forEach((element) => {
            htmlString += ` <div class="PLANT-BOX" style="margin:30px">
                         <img src="../../images/Main/${element.name.replace(
                           /\s/g,
                           ""
                         )}.jpg" />
                         <div class = "TEXT-BOX">
                          <h3>${element.name}</h3>
                          <p>${element.description}</p>
                          
                          </div>
                          </div>
          `;
          });

          htmlString += "</div> ";
        }

        resultsDiv.innerHTML = htmlString;
      })
      .catch((error) => console.error("Error:", error));
  });

document
  .getElementById("showPopularity")
  .addEventListener("click", function () {
    fetch("/api/showPopularity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Plantele tale sunt", data.rows);

        let resultsDiv = document.getElementById("COLLECT2");
        let htmlString = "";

        if (data.rows.length == 0) {
          htmlString += "<h2>Sorry, your collection is empty :(</h2>";
        } else {
          data.rows.forEach((element) => {
            htmlString += ` <div class="PLANT-BOX" style="margin:30px">
                         <img src="../../images/Main/${element.name.replace(
                           /\s/g,
                           ""
                         )}.jpg" />
                         <div class = "TEXT-BOX">
                          <h3>${element.name}</h3>
                          <p>${element.description}</p>
                          
                          </div>
                          </div>
          `;
          });

          htmlString += "</div> ";
        }

        resultsDiv.innerHTML = htmlString;
      })
      .catch((error) => console.error("Error:", error));
  });

const generateRSSButton = document.getElementById("rss");

generateRSSButton.addEventListener("click", () => {
  fetch("/api/rss", { method: "POST" })
    .then((response) => response.text())
    .then((data) => {
      const newTab = window.open(); // Deschideți un tab nou în browser
      newTab.document.write(`<pre>${data}</pre>`); // Afișați conținutul XML în tab-ul nou
    })
    .catch((error) => console.error(error));
});
