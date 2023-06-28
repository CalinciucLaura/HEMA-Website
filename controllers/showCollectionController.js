// controllers/showMyCollectionController.js
const { getYourCollection, getCookie } = require("../repositories/index");
const { getCurrentUser } = require("../repositories/user");

async function showCollectionController(req, res) {
  try {
    const id_user = await getCurrentUser(req);
    getYourCollection(id_user.id).then((rows) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          rows,
        })
      );
      return;
    });
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
    return;
  }
}

module.exports = { showCollectionController: showCollectionController };
