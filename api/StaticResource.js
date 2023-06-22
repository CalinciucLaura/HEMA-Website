const fs = require("fs"); //manipularea fisierelor
const path = require("path");
const { c } = require("tar");

function returnStaticResource(req, res, next) {
  //console.log("Url", req.url);

  let filePath;
  let extname;
  let contentType = "text/html";

  if (next == true) {
    filePath = path.join(__dirname, "..", "pages", req.url);
  } else {
    filePath = path.join(__dirname, "..", "pages", "Login", "login.html");
  }

  //console.log("filePath", filePath);

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

  //console.log("File", filePath);

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
      res.writeHead(200, { "Content-Type": contentType }); //200 = OK
      res.end(content, "utf8");
    }
  });
}

exports.returnStaticResource = returnStaticResource;
