document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //console.log(username, password);

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.replace("/Main/Main.html");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Username is NOT in the database") {
          document.getElementById("loginMessage").innerHTML =
            "Verify your info or create an account :)";
        }
      })
      .catch((error) => console.error("Error:", error));
  });
