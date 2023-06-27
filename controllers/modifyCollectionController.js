const db = require("../databaseSetup.js");
const { getIdPlant, checkExistingEntry } = require("../repositories/plant");
const { getYourCollection } = require("../repositories/index");
const { getCurrentUser } = require("../repositories/user");

function modifyCollectionController(req, res) {
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

      console.log("Id-ul userului este: ", id_user);

      // already exists?
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

            getYourCollection(id_user).then((rows) => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  plantInCollection: false,
                  message: "Plant removed from the collection",
                  rows: rows,
                })
              );
              return;
            });
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
            getYourCollection(id_user).then((rows) => {
              console.log("Rows from collection", rows);
              console.log(`A row has been inserted with rowid ${this.lastID}`);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  plantInCollection: plantInCollection,
                  rows: rows,
                })
              );
              return;
            });
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
module.exports = { modifyCollectionController: modifyCollectionController };
