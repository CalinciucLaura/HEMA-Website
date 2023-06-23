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
