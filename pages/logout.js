console.log("logout.js");

document
  .getElementById("login-link")
  .addEventListener("click", function (event) {
    event.preventDefault();

    fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.replace("/");
        }
        return response.json();
      })
      .catch((error) => console.error("Error:", error));
  });

document
  .getElementById("favorite-button")
  .addEventListener("click", function (event) {
    var heart = this.firstChild;

    if (heart.classList.contains("heart-default")) {
      heart.classList.remove("heart-default");
      heart.classList.add("heart-active");
    } else {
      heart.classList.remove("heart-active");
      heart.classList.add("heart-default");
    }

    // Opriți propagarea evenimentului
    event.stopPropagation();
  });

// Select all buttons with the class "favorite-button"
var buttons = document.querySelectorAll(".favorite-button");

// Add the event listener to each button
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    var heart = this.firstChild;

    if (heart.classList.contains("heart-default")) {
      heart.classList.remove("heart-default");
      heart.classList.add("heart-active");
    } else {
      heart.classList.remove("heart-active");
      heart.classList.add("heart-default");
    }

    // Stop event propagation
    event.stopPropagation();
  });
});
