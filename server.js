const http = require("http");
const fs = require("fs"); //manipularea fisierelor
const path = require("path");

const { Console } = require("console");
const { returnStaticResource } = require("./api/StaticResource");
const { r, c, update } = require("tar");

//const { DatabaseManage } = require("./api/DatabaseManage");
const crypto = require("crypto"); //pentru token random
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
    sessionToken TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS plantAbout(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  name TEXT,
  type TEXT,
  color TEXT,
  conditions TEXT,
  season TEXT,
  description TEXT
)`);

db.run(
  "CREATE TABLE IF NOT EXISTS collection ( id_plant INTEGER, id_user INTEGER, FOREIGN KEY(id_plant) REFERENCES plantAbout(id), FOREIGN KEY(id_user) REFERENCES users(id))"
);

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
  let query = "SELECT name, description FROM plantAbout WHERE";
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

function getCookie(req) {
  let cookies = req.headers.cookie.split("; ");
  let sessionToken;

  for (let cookie of cookies) {
    let [name, value] = cookie.split("=");
    if (name === "session") {
      sessionToken = value;
      break;
    }
  }

  console.log("Session token:", sessionToken);
  return sessionToken;
}

function getIdPlant(name) {
  console.log("Pas4", name);

  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM plantAbout WHERE name = ?`, [name], (err, row) => {
      if (err) {
        console.log("Eroare");
        console.error(err.message);
        reject(err);
      } else {
        console.log("Id-ul plantei este", row.id);
        resolve(row.id);
      }
    });
  });
}

function getCurrentUser(req) {
  return new Promise((resolve, reject) => {
    let sessionToken = getCookie(req);
    console.log("Tokenul este", sessionToken);
    db.get(
      `SELECT id FROM users WHERE sessionToken = ?`,
      [sessionToken],
      (err, row) => {
        if (err) {
          console.log("Este o eroare la selectarea id-ului userului");
          console.error(err.message);
          reject(err);
        } else {
          console.log("Id-ul userului este", row.id);
          resolve(row.id);
        }
      }
    );
  });
}

async function getUserData() {
  try {
    const userId = await getCurrentUser(req);
    console.log(userId);
  } catch (error) {
    console.error(error);
  }
}

async function checkExistingEntry(id_plant, id_user) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM collection WHERE id_plant = ? AND id_user = ?",
      [id_plant, id_user],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row !== undefined);
      }
    );
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

      if (
        category == "" &&
        name == "" &&
        type == "" &&
        color == "" &&
        conditions == "" &&
        season == ""
      ) {
        console.log("You need to select at least one option");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "You need to select at least one option" })
        );
        return;
      }

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
              //Atunci cand se conecteaza, se face un cookie pentru fiecare user

              let token = crypto.randomBytes(20).toString("hex");

              //seteaza cookie
              res.setHeader(
                "Set-Cookie",
                "session=" + token + "; Path=/; HttpOnly"
              );
              console.log("Cookie setat");

              db.run(
                "INSERT INTO users(username, email, password, sessionToken) VALUES(?, ?, ?, ?)",
                [username, email, password, token],
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
            //Atunci cand se conecteaza, se face un cookie pentru fiecare user

            let token = Math.random().toString(36).substr(2, 8);

            //seteaza cookie

            res.setHeader(
              "Set-Cookie",
              "session=" + token + "; Path=/; HttpOnly"
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

  //LOGOUT
  //Sterge cookie-ul
  if (req.method === "GET" && req.url === "/api/logout") {
    console.log("You are in the logout page");
    //ia cookie-ul

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

  if (req.method === "POST" && req.url === "/api/name") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });

    console.log("You are in the name page");

    req.on("end", async () => {
      try {
        const { plantName } = JSON.parse(body);
        if (plantName === null || plantName === undefined || plantName === "") {
          console.log("plantName not provided");
          return;
        }

        const id_plant = await getIdPlant(plantName);
        const id_user = await getCurrentUser(req);

        console.log(typeof id_user);
        console.log("Id-ul userului este: ", id_user);

        // Check if the plant already exists in the user's collection
        const existingEntry = await checkExistingEntry(id_plant, id_user);
        let plantInCollection = false; // Initialize with false by default

        if (existingEntry) {
          // Plant already exists in the collection, remove it
          db.run(
            "DELETE FROM collection WHERE id_plant = ? AND id_user = ?",
            [id_plant, id_user],
            function (err) {
              if (err) {
                console.error(err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Server error");
                return;
              }
              plantInCollection = false; // Update to false
              console.log("Plant removed from the collection");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  plantInCollection: existingEntry,
                  message: "Plant removed from the collection",
                })
              );
            }
          );
        } else {
          // Plant does not exist in the collection, insert it
          db.run(
            "INSERT INTO collection (id_plant, id_user) VALUES (?, ?)",
            [id_plant, id_user],
            function (err) {
              if (err) {
                console.error(err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Server error");
                return;
              }
              plantInCollection = true; // Update to true
              // get the last insert id
              console.log(`A row has been inserted with rowid ${this.lastID}`);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  plantInCollection: !existingEntry,
                  message: "Plant added to the collection",
                })
              );
            }
          );
        }
      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
        return;
      }
    });
  }

  if (req.url === "/" && req.method === "GET") {
    returnStaticResource(req, res, false);
    return;
  } else if (!req.url.startsWith("/api") && req.method === "GET") {
    returnStaticResource(req, res, true);
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
