const { error } = require("console");

const plantName = localStorage.getItem("plant");
const divElement = document.getElementById("favorites");

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
          htmlString += "<h2>Sorry, there are no collections :(</h2>";
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
      const blob = new Blob([data], { type: "application/rss+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "rss.xml";
      link.style.display = "none";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error(error));
});

document.getElementById("showAllUsers").addEventListener("click", function () {
  fetch("/api/showUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! Status: ${response.status}");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Users:", data);
      createTable(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error(error);
      alert("Error: " + error);
    });
});

function createTable(data) {
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  const headerRow = document.createElement("tr");
  for (let key in data[0]) {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  data.forEach((user) => {
    const row = document.createElement("tr");
    for (let key in user) {
      const cell = document.createElement("td");
      cell.textContent = user[key];
      row.appendChild(cell);
    }
    table.appendChild(row);
  });
}
