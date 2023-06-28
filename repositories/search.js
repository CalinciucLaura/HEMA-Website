const db = require("../databaseSetup.js");

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

  if (params.length) {
    query = query.slice(0, -3);
  } else {
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
module.exports = { getFromDatabase: getFromDatabase };
