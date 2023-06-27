const db = require("../databaseSetup.js");

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
  return sessionToken;
}
async function getCurrentUser(req) {
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

module.exports = {
  isInDatabase: isInDatabase,
  isInDatabase2: isInDatabase2,
  getCurrentUser: getCurrentUser,
  getCookie: getCookie,
};
