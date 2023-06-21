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
        window.location.replace("/Login/Login.html");
      })
      .catch((error) => console.error("Error:", error));
  });
