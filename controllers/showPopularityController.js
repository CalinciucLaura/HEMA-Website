const { getPopularity, generateRssXml } = require("../repositories/index");
const { getCurrentUser } = require("../repositories/user");
const fs = require("fs");

async function showPopularityController(req, res) {
  body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });

  req.on("end", async () => {
    try {
      const id_user = await getCurrentUser(req);
      getPopularity().then((rows) => {
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
  });
}

function showRssController(req, res) {
  getPopularity()
    .then((plants) => {
      const rssFeed = {
        TITLE: "Clasamentul plantelor populare",
        description:
          "Aici găsiți clasamentul celor mai populare plante colectate.",
        language: "en",
        lastBuildDate: new Date(),
      };

      const items = plants.map((plant) => {
        return {
          name: plant.name,
          description: plant.description,
          top: plant.appearance_count,
          color: plant.color,
          category: plant.category,
          type: plant.type,
          season: plant.season,
          pubDate: new Date().toUTCString(),
        };
      });

      const rssXml = generateRssXml(rssFeed, items);

      res.setHeader("Content-Type", "application/rss+xml");
      res.end(rssXml);
    })
    .catch((error) => {
      console.error(error);
      res.statusCode = 500;
      res.end("A apărut o eroare în generarea fișierului RSS.");
    });
}

module.exports = {
  showPopularityController: showPopularityController,
  showRssController: showRssController,
};
