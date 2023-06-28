const db = require("../databaseSetup.js");
const { isInDatabase2, getCurrentUser } = require("../repositories/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

function generateSessionId() {
  return crypto.randomBytes(20).toString("hex");
}

function getCookieExpirationDate(days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  return expirationDate.toUTCString();
}

function loginController(req, res) {
  const sessionId = generateSessionId();

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
        }

        res.setHeader(
          "Set-Cookie",
          `session=${sessionId}; Expires=${getCookieExpirationDate(
            7
          )}; Path=/; HttpOnly`
        );

        console.log("Cookie setat");

        // Update in the database
        let sql = `UPDATE users SET sessionToken = ? WHERE username = ?`;
        db.run(sql, [sessionId, username], function (err) {
          if (err) {
            console.error(err.message);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal server error" }));
            return;
          }
          console.log(`Row(s) updated: ${this.changes}`);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(username));
        });
      })
      .catch((err) => {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error" }));
      });
  });
}

async function logoutController(req, res) {
  let cookies = req.headers.cookie.split("; ");
  let sessionToken;

  for (let cookie of cookies) {
    let [name, value] = cookie.split("=");
    if (name === "session") {
      console.log("Token-ul este: ", value);
      console.log("Numele este: ", name);
      sessionToken = value;
      break;
    }
  }

  console.log("Token-ul este: ", sessionToken);
  try {
    const currentUser = await getCurrentUser(req);

    if (!currentUser) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid session token" }));
      return;
    }

    // Update in the database
    let sql = `UPDATE users SET sessionToken = ? WHERE username = ? AND sessionToken = ?`;
    db.run(sql, [null, currentUser.username, sessionToken], function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    });

    res.setHeader(
      "Set-Cookie",
      "session=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly"
    );
    console.log("Cookie sters");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "You are logged out" }));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
}

module.exports = {
  loginController: loginController,
  logoutController: logoutController,
};
