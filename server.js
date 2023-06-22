const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const sqlite3 = require("sqlite3").verbose();

// Connect to database
const db = new sqlite3.Database(
  "Database/person.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the person database.");
  }
);

db.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT,
  password TEXT,
  isLogged INTEGER
)`);

function isInDatabase(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT count(username) AS count FROM users WHERE username = ? `,
      [username],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count > 0);
          console.log(row.count > 0);
        }
      }
    );
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on("end", () => {
      const { username, email, password } = querystring.parse(body);

      console.log("Username: ", username);
      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("isLogged: ", true);

      console.log("Username is not in database");
      if (
        email.includes("@") == true &&
        email.includes(".") == true &&
        password.length >= 1
      ) {
        db.run(
          `INSERT INTO users(username, email, password, isLogged) VALUES(?, ?, ?, 1)`,
          [username, email, password],
          function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row was added to the table with rowid ${this.lastID}`);
          }
        );
        res.writeHead(302, { Location: "/Main/Main.html" });
        res.end();
      } else {
        console.log("Email or password is not valid");
        res.writeHead(302, { Location: "/Register/register.html" });
        res.end();
      }
    });

    return;
  }

  let filePath = path.join(
    __dirname,
    "pages",
    req.url === "/" ? "Login/login.html" : req.url
  );
  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      //aici trb afisat un pop-up cu eroarea si nu sa ne redirectioneze la pagina de eroare
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

server.listen(5500, () => {
  console.log("Server is running on port 5500");
});
