const { is } = require("date-fns/locale");
const db = require("../databaseSetup.js");
const bcrypt = require("bcrypt");

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
      `SELECT username, password FROM users WHERE username = ?`,
      [username],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        if (!row) {
          resolve(false);
        } else {
          const hashedPassword = row.password;
          bcrypt.compare(password, hashedPassword, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
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
      `SELECT * FROM users WHERE sessionToken = ?`,
      [sessionToken],
      (err, row) => {
        if (err) {
          console.log("Este o eroare la selectarea userului");
          console.error(err.message);
          reject(err);
        } else {
          console.log("Userul este", row);
          resolve(row);
        }
      }
    );
  });
}

function isAnAdmin(req) {
  return new Promise((resolve, reject) => {
    let sessionToken = getCookie(req);
    db.get(
      `SELECT isAdmin FROM users WHERE sessionToken = ?`,
      [sessionToken],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row.isAdmin);
        }
      }
    );
  });
}

function getUsers(req) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, username, email , isAdmin FROM users`, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  isInDatabase: isInDatabase,
  isInDatabase2: isInDatabase2,
  getCurrentUser: getCurrentUser,
  getCookie: getCookie,
  isAnAdmin: isAnAdmin,
  getUsers: getUsers,
};
