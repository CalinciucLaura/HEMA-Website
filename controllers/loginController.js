const db = require("../databaseSetup.js");
const { isInDatabase2 } = require("../repositories/user");
const crypto = require("crypto");

// function loginController(req, res) {
function loginController(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });

  req.on("end", () => {
    const { username, password } = JSON.parse(body);

    isInDatabase2(username, password)
      .then((isInDb) => {
        if (!isInDb) {
          console.log("Username is NOT in the database");
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Username is NOT in the database" })
          );
          return;
        } else {
          //Atunci cand se conecteaza, se face un cookie pentru fiecare user

          //seteaza cookie
          let token = crypto.randomBytes(20).toString("hex");
          const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Expiră într-o săptămână

          //seteaza cookie
          res.setHeader(
            "Set-Cookie",
            "session=" +
              token +
              "; Expires=" +
              expirationDate.toUTCString() +
              "; Path=/; HttpOnly"
          );

          console.log("Cookie setat");

          //update in baza de date
          let sql = `UPDATE users SET sessionToken = ? WHERE username = ?`;
          db.run(sql, [token, username], function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(username));
        }
      })
      .catch((err) => console.error(err));
  });
  return;
}

function logoutController(req, res) {
  let cookies = req.headers.cookie.split("; ");
  let sessionToken;

  for (let cookie of cookies) {
    let [name, value] = cookie.split("=");
    if (name === "session") {
      sessionToken = value;
      break;
    }
  }

  console.log("Token-ul este: ", sessionToken);

  //update in baza de date
  let sql = `UPDATE users SET sessionToken = ? WHERE sessionToken = ? `; //seteaza isLogged pe null
  db.run(sql, [null, sessionToken], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });

  //sterge cookie
  res.setHeader("Set-Cookie", "session=; Path=/; HttpOnly");
  console.log("Cookie sters");

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "You are logged out" }));
  return;
}

module.exports = {
  loginController: loginController,
  logoutController: logoutController,
};
