const http = require("http");
const fs = require("fs"); //manipularea fisierelor
const path = require("path");
const querystring = require("querystring");
const { Console } = require("console");
const { returnStaticResource } = require("./api/StaticResource");
const { r } = require("tar");
const { eventNames } = require("process");

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

function getFromDatabase(category, name, type, color, conditions, season) {
  let query = "SELECT name FROM plantAbout WHERE";
  let params = [];

  console.log(category, name, type, color, conditions, season);

  let addCondition = function (param, name) {
    if (param && param.length) {
      query +=
        ` ${name} IN (` + "?,".repeat(param.length).slice(0, -1) + ") AND";
      params.push(...param);
    }
  };

  addCondition(category, "category");
  addCondition(name, "name");
  addCondition(type, "type");
  addCondition(color, "color");
  addCondition(conditions, "conditions");
  addCondition(season, "season");

  // Removing last "AND"
  if (params.length) {
    query = query.slice(0, -3);
  } else {
    // If no parameters were passed, remove the WHERE clause
    query = "SELECT name FROM plantAbout";
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const server = http.createServer((req, res) => {
  //console.log("Path ul este:" , req.url);

  if (req.method === "POST" && req.url === "/api/search") {
    console.log("You are in the search page");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on("end", () => {
      const { category, name, type, color, conditions, season } =
        JSON.parse(body);

      getFromDatabase(category, name, type, color, conditions, season)
        .then((row) => {
          if (!row) {
            console.log("Plant is NOT in the database");
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Plant is NOT in the database" })
            );
            return;
          } else {
            console.log("Plant is in the database");
            console.log(row);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(row));
          }
        })
        .catch((err) => console.error(err));
    });
    return;
  }

  // REGISTER
  if (req.method === "POST" && req.url === "/api/register") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

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

  if (!req.url.startsWith("/api") && req.method === "GET") {
    console.log("Am intrat in pagina");
    returnStaticResource(req, res);
    return;
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
