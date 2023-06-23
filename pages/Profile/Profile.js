const plantName = localStorage.getItem("plant");
const divElement = document.getElementById("favorites");

// Verifică dacă plantName există și nu este gol
if (plantName) {
  // Transformă plantName într-un array de obiecte (presupunând că este în format JSON)
  const plantArray = JSON.parse(plantName);

  let html = "";

  // Iterează prin fiecare obiect din plantArray și construiește elementele HTML
  plantArray.forEach((element) => {
    html += `<div class="PLANT-BOX">
      <img src="../../images/Main/${element.name.replace(/\s/g, "")}.jpg" />
      <div class="TEXT-BOX">
          <h3>${element.name}</h3>
      </div>
    </div>`;
  });

  // Adaugă html generat în divElement
  divElement.innerHTML = html;
}

localStorage.removeItem("plant");
