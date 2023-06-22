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

// Path: pages\Main\Main.js

document
  .getElementById("mySearch")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Previne trimiterea formularului

    var categoryOptions = document.querySelectorAll(
      'input[name="category"]:checked'
    );
    var category = categoryOptions
      ? Array.from(categoryOptions).map((el) => el.value)
      : [];

    var nameOptions = document.querySelectorAll(' input[name="name"]:checked');
    var name = nameOptions ? Array.from(nameOptions).map((el) => el.value) : [];

    var typeOptions = document.querySelectorAll('input[name="type"]:checked');
    var type = nameOptions ? Array.from(typeOptions).map((el) => el.value) : [];

    var colorOptions = document.querySelectorAll(
      ' input[name="color"]:checked'
    );
    var color = colorOptions
      ? Array.from(colorOptions).map((el) => el.value)
      : [];

    var conditionsOptions = document.querySelectorAll(
      ' input[name="conditions"]:checked'
    );

    var conditions = conditionsOptions
      ? Array.from(conditionsOptions).map((el) => el.value)
      : [];

    var seasonOptions = document.querySelectorAll(
      ' input[name="season"]:checked'
    );
    var season = seasonOptions
      ? Array.from(seasonOptions).map((el) => el.value)
      : [];

    //console.log(category, name, type, color, conditions, season);

    //trimit la server informatiile
    fetch("/api/search", {
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
        return response.json();
      })
      .then((data) => {
        let resultsDiv = document.getElementById("showResults");
        let htmlString = "";

        if (data.message == "You need to select at least one option") {
          htmlString += "<h2>You need to select at least one option</h2>";
        } else if (data.length == 0) {
          htmlString += "<h2>Sorry, no results found :(</h2>";
        } else {
          data.forEach((element) => {
            htmlString += ` <div class="PLANT-BOX">
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
