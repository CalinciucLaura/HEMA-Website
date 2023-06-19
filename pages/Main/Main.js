document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".NAVBAR");

  hamburger.addEventListener("click", () => {
    console.log(
      "The hamburger button was clicked. The class 'hamburger-clicked' was toggled on the button and the display property of the .NAVBAR list was toggled."
    );

    hamburger.classList.toggle("hamburger-clicked");
    navbar.style.display = navbar.style.display === "none" ? "flex" : "none";
  });

  // add a resize event listener to remove the hamburger-clicked class when the window is resized beyond the media query's maximum width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("hamburger-clicked");
      navbar.style.display = "flex";
    }
  });
});

document
  .getElementById("mySearch")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Previne trimiterea formularului

    var category = document.getElementById("category").value;
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var color = document.getElementById("color").value;
    var conditions = document.getElementById("conditions").value;
    var season = document.getElementById("season").value;

    //trimit la server informatiile
    fetch("api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        name,
        type,
        color,
        conditions,
        season,
      }),
    })
      .then((response) => {
        console.log("SUCCES", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        //daca nu am gasit nimic
        if (data.length === 0) {
          document.getElementById("searchResults").innerHTML =
            "No results found";
        } else {
          //daca am gasit ceva
          document.getElementById("searchResults").innerHTML =
            "AM GASIT PLANTA";
        }
      })

      .catch((error) => console.error("Error:", error));
  });
