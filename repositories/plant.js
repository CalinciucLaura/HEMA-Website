const db = require("../databaseSetup.js");

function getIdPlant(name) {
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
module.exports = {
  getIdPlant: getIdPlant,
  checkExistingEntry: checkExistingEntry,
};
