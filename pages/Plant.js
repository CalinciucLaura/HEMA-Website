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

// Fetch the user's plant collection from the server
fetch("/api/collection")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Iterate over each plant in the collection
    data.forEach((plant) => {
      // Find the button element with the corresponding data-name attribute
      const button = document.querySelector(
        `.favorite-button[data-name="${plant.name}"]`
      );
      if (button) {
        // Set the button's style to red
        button.style.backgroundColor = "red";
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

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
      body: JSON.stringify({ plantName: plantName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.rows);
        localStorage.setItem("plant", JSON.stringify(data.rows));

        if (data.plantInCollection) {
          button.style.backgroundColor = "red";
        } else {
          button.style.backgroundColor = "";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
