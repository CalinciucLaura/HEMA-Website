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

console.log("plant.js");

const buttons = document.querySelectorAll(".favorite-button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const plantName = button.getAttribute("data-name");
    console.log(plantName);

    fetch("/api/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: plantName }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.rows);
        localStorage.setItem("plant", data.rows);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
