document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(username, email, password);

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
    // body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.replace("/Main/Main.html");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("registerMessage").innerHTML =
        "Sorry, but your name is not valid :( Try again";
    })
    .catch((error) => console.error("Error:", error));
});
