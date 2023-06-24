const { Console } = require("console");
const fs = require("fs"); //manipularea fisierelor
const { get } = require("http");
const path = require("path");
const { r, c, update } = require("tar");

function returnStaticResource(req, res, next) {
  let filePath;
  let extname;
  let contentType = "text/html";
  //console.log(req.url);

  if (next == true) {
    filePath = path.join(__dirname, "..", "pages", req.url);
  } else {
    filePath = path.join(__dirname, "..", "pages", "Login", "login.html");
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

exports.returnStaticResource = returnStaticResource;
