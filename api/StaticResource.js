const fs = require("fs");
const path = require("path");

function returnStaticResource(req, res, next) {
  let filePath;
  let extname;
  let contentType = "text/html";

  if (next) {
    filePath = path.join(__dirname, "..", "pages", req.url);
  } else {
    console.log("login");
    filePath = path.join(__dirname, "..", "pages", "Login", "login.html");
    console.log(filePath);
  }

  if (filePath === undefined) {
    res.writeHead(404);
    res.end("404 Not Found");
    return;
  }

  extname = path.extname(filePath);

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".html":
      contentType = "text/html";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`, err);
      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}

module.exports = { returnStaticResource: returnStaticResource };
