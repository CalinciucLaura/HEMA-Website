const { getFromDatabase } = require("../repositories/search");
const db = require("../databaseSetup.js");

function searchController(req, res) {
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
          res.end(JSON.stringify({ message: "Plant is NOT in the database" }));
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
module.exports = { searchController: searchController };
