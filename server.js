const http = require("http");
const fs = require("fs"); //manipularea fisierelor
const path = require("path");
const querystring = require("querystring");
const { Console } = require("console");
const { returnStaticResource } = require("./api/StaticResource");
//const { DatabaseManage } = require("./api/DatabaseManage");
const { getFromDatabase } = require("./api/DatabaseManage");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "Database\\person.db",
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

// db.run(`CREATE TABLE IF NOT EXISTS plant(
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   cathegory TEXT
// )`);

db.run(`CREATE TABLE IF NOT EXISTS plantAbout(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  name TEXT,
  type TEXT,
  color TEXT,
  conditions TEXT,
  season TEXT
)`);

function isInDatabase(username, email) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT count(username) AS count FROM users WHERE username = ? or email = ?`,
      [username, email],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row.count > 0);
          //console.log(row.count > 0);
        }
      }
    );
  });
}

function isInDatabase2(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT count(username) AS count FROM users WHERE username = ? and password = ?`,
      [username, password],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row.count > 0);
          //console.log(row.count > 0);
        }
      }
    );
  });
}

//function getFromDatabase(cathegory, name, type, color, conditions, season)

const server = http.createServer((req, res) => {
  //console.log("Path ul este:" , req.url);

  if (!req.url.startsWith("/api") && req.method === "GET") {
    returnStaticResource(req, res);
    return;
  }

  // REGISTER
  if (req.method === "POST" && req.url === "/api/register") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    //console.log("Body-ul este",body);

    req.on("end", () => {
      // const { username, email, password } = querystring.parse(body);  //extrage username, email, password din body
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
              db.run(
                "INSERT INTO users(username, email, password, isLogged) VALUES(?, ?, ?, 1)",
                [username, email, password],
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

                  //res.setHeader('Set-Cookie', 'session=123456; Path=/; HttpOnly');

                  // res.writeHead(302, { 'Location': '/Main/Main.html' });
                  // res.end();
                }
              );
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
    return;
  }

  //LOGIN
  if (req.method === "POST" && req.url === "/api/login") {
    console.log("You are in the login page");
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
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User was sent to Main page" }));
          }
        })
        .catch((err) => console.error(err));
    });
    return;
  }

  //SEARCH
  if (req.method === "POST" && req.url === "/api/search") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on("end", () => {
      const { category, name, type, color, conditions, season } =
        JSON.parse(body);
      console.log("in Search");

      db.all(
        `SELECT * FROM plantAbout WHERE category = ? AND name = ? AND type = ? AND color = ? AND conditions = ? AND season = ?`,
        [category, name, type, color, conditions, season],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            return;
          }

          console.log("Rows:", rows);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(rows));
        }
      );
    });
  }
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(5500, () => {
  console.log("Server is running on port 5500");
});

// Close database connection when the process exits
process.on("exit", (code) => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
});
