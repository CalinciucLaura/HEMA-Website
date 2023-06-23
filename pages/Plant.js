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

const button = document.querySelector(".favorite-button");

button.addEventListener("click", function () {
  const plantName = this.dataset.name;

  fetch("/api/name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantName: plantName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error(error);
    });
});
