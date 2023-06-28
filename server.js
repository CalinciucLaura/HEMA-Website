const http = require("http");
const fs = require("fs"); //manipularea fisierelor
const path = require("path");
const { format } = require("date-fns");
const { Console } = require("console");
const { returnStaticResource } = require("./api/StaticResource");
const { r, c, update } = require("tar");
//const { DatabaseManage } = require("./api/DatabaseManage"); // de dat uncommment pentru a insera datele in baza de date cu flori
const crypto = require("crypto"); //pentru token random
const sqlite3 = require("sqlite3").verbose();
const { getCookie } = require("./repositories/user");

const {
  showCollectionController,
} = require("./controllers/showCollectionController.js");
const {
  showPopularityController,
  showRssController,
} = require("./controllers/showPopularityController");
const { searchController } = require("./controllers/searchController");
const { registerController } = require("./controllers/registerController");
const {
  loginController,
  logoutController,
} = require("./controllers/loginController");
const {
  modifyCollectionController,
} = require("./controllers/modifyCollectionController");
// const { accessController } = require("./controllers/accessController");
const { showUsers } = require("./controllers/showUsers");

async function getUserData() {
  try {
    const userId = await getCurrentUser(req);
    console.log(userId);
  } catch (error) {
    console.error(error);
  }
}

function generateRssXml(rssFeed, items) {
  const xmlItems = items
    .map((item) => {
      return `
        <item>
          <name>NAME: ${item.name}</name>
          <top>NR. OF APPEARANCES: ${item.top} </top>
          <category>CATEGORY: ${item.category}</category>
          <type>TYPE: ${item.type} </type>
          <season>SEASON: ${item.season} </season>
          <color>COLOR: ${item.color}</color>      
          <description>DESCRIPTION: ${item.description}</description>
          <language>LANGUAGE: EN</language>
          <pubDate>PUBLIC DATE: ${item.pubDate}</pubDate>
        </item>
      `;
    })
    .join("");

  const rssXml = `
    <rss version="2.0">
      <channel>
        <title>TOP 8 PLANTS</title>
        <description> DESCRIPTION: ${rssFeed.description}</description>
        <language> Language:  ${rssFeed.language}</language>
        <lastBuildDate> DOWNLOAD NOW : ${rssFeed.lastBuildDate}</lastBuildDate>
        ${xmlItems}
      </channel>
    </rss>
  `;

  return rssXml;
}

const server = http.createServer((req, res) => {
  // SEARCH
  if (req.method === "POST" && req.url === "/api/search") {
    searchController(req, res);
    return;
  }

  // REGISTER
  if (req.method === "POST" && req.url === "/api/register") {
    registerController(req, res);
    return;
  }

  //LOGIN
  if (req.method === "POST" && req.url === "/api/login") {
    loginController(req, res);
    return;
  }

  //LOGOUT
  if (req.method === "GET" && req.url === "/api/logout") {
    logoutController(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/name") {
    console.log("name");
    modifyCollectionController(req, res);
  }

  if (req.method === "POST" && req.url === "/api/showMyCollection") {
    showCollectionController(req, res);
  }

  if (req.method === "POST" && req.url === "/api/showPopularity") {
    showPopularityController(req, res);
  }
  if (req.method === "POST" && req.url === "/api/rss") {
    showRssController(req, res);
  }

  if (req.method === "POST" && req.url === "/api/showUsers") {
    showUsers(req, res);
    return;
  }

  // if (req.method == "POST" && req.url === "/api/rss") {
  //   //titlul si numele filei
  //   getPopularity()
  //     .then((plants) => {
  //       const rssFeed = {
  //         TITLE: "Clasamentul plantelor populare",
  //         description:
  //           "Aici găsiți clasamentul celor mai populare plante colectate.",
  //         language: "en",
  //         lastBuildDate: new Date(),
  //       };

  //       const items = plants.map((plant) => {
  //         return {
  //           name: plant.name,
  //           description: plant.description,
  //           top: plant.appearance_count,
  //           color: plant.color,
  //           category: plant.category,
  //           type: plant.type,
  //           season: plant.season,
  //           pubDate: new Date().toUTCString(),
  //         };
  //       });

  //       const rssXml = generateRssXml(rssFeed, items);

  //       fs.writeFileSync("rss.xml", rssXml);

  //       res.end(rssXml);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       res.statusCode = 500;
  //       res.end("A apărut o eroare în generarea fișierului RSS.");
  //     });
  // }

  // NOT ALLOW NO AUTHENTICATED USERS TO ACCESS THE API
  // if (req.url === "/" && req.method === "GET") {
  //   accessController(req, res);
  // }

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
