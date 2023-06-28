const db = require("../databaseSetup.js");
const { isInDatabase } = require("../repositories/user.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

function registerController(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });

  req.on("end", () => {
    const { username, email, password } = JSON.parse(body);

    isInDatabase(username, email)
      .then((isInDb) => {
        if (isInDb) {
          console.log("Username is already in the database");
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Username is already in the database" })
          );
          return;
        } else {
          if (
            email.includes("@") &&
            email.includes(".") &&
            password.length >= 1
          ) {
            bcrypt.hash(password, 10, function (err, hashedPassword) {
              if (err) {
                console.error(err);
                return;
              }

              let token = crypto.randomBytes(20).toString("hex");

              const expirationDate = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ); // Expiră într-o săptămână

              // Setează cookie
              res.setHeader(
                "Set-Cookie",
                "session=" +
                  token +
                  "; Expires=" +
                  expirationDate.toUTCString() +
                  "; Path=/; HttpOnly"
              );
              console.log("Cookie setat");

              db.run(
                "INSERT INTO users(username, email, password, sessionToken) VALUES(?, ?, ?, ?)",
                [username, email, hashedPassword, token],
                function (err) {
                  if (err) {
                    return console.error(err.message);
                  }

                  console.log(
                    `Row was added to the table with rowid ${this.lastID}`
                  );

                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify({
                      message: "User was added to the database",
                    })
                  );
                }
              );
            });
          } else {
            console.log("Email or password is not valid");
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Email or password is not valid" })
            );
          }
        }
      })
      .catch((err) => console.error(err));
  });
}

module.exports = { registerController: registerController };
