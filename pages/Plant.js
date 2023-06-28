function showDialog(title, text) {
  var dialog = document.getElementById("dialog");
  var dialogTitle = document.getElementById("dialog-title");
  var dialogText = document.getElementById("dialog-text");

  dialogTitle.innerHTML = title;
  dialogText.innerHTML = text;
  dialog.style.display = "block";
}

function closeDialog() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}

const buttons = document.querySelectorAll(".favorite-button");

buttons.forEach((button) => {
  const plantName = button.getAttribute("data-name");

  // Verificați dacă planta are atributul "data-name" corespunzător în Local Storage
  const storedPlants = JSON.parse(localStorage.getItem("plant"));
  if (
    storedPlants &&
    storedPlants.find((row) => row.name.toLowerCase() === plantName)
  ) {
    button.classList.add("heart-active"); // Adăugați clasa "heart-active" pentru stilul roșu
  }

  button.addEventListener("click", function () {
    fetch("/api/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plantName: plantName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.rows);
        localStorage.setItem("plant", JSON.stringify(data.rows));
        showDialog(
          "Colectia ta a fost actualizata! Mergi pe pagina profilului ! :)",
          "Ne bucuram ca ai ales HeMA! :)"
        );

        // Verificați dacă butonul are clasa "heart-active" și inversați-o
        if (button.classList.contains("heart-active")) {
          button.classList.remove("heart-active");
        } else {
          button.classList.add("heart-active");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

const plantArray = JSON.parse(localStorage.getItem("plant"));

if (plantArray) {
  plantArray.forEach((plant) => {
    const { name } = plant;

    // Selectați butonul cu atributul "data-name" corespunzător și adăugați clasa "heart-active"
    const matchingButton = document.querySelector(
      `.favorite-button[data-name="${name.toLowerCase()}"]`
    );
    if (matchingButton) {
      matchingButton.classList.add("heart-active");
    }
  });
}

localStorage.removeItem("plant");
