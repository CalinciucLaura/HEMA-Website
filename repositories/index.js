const db = require("../databaseSetup.js");

async function getYourCollection(id_user) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name, description from plantAbout p JOIN collection c ON p.id = c.id_plant JOIN users u ON u.id = c.id_user WHERE id_user = ?`,
      [id_user],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function getPopularity() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name, color, type, category, conditions, season, description, COUNT(c.id_plant) AS appearance_count from plantAbout p JOIN collection c ON p.id = c.id_plant GROUP BY c.id_plant ORDER BY appearance_count DESC LIMIT 8 `,
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

module.exports = {
  getYourCollection: getYourCollection,
  getPopularity: getPopularity,
};
