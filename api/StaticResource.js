const fs = require('fs'); //manipularea fisierelor
const path = require('path');

function returnStaticResource(req, res) {
    let filePath;
    let extname;
    let contentType = 'text/html';
    
    filePath = path.join(__dirname,  '..', 'pages', req.url);
    
    if(filePath === undefined) {
        res.writeHead(404);
        res.end('404 Not Found');
        return
    }

    extname = path.extname(filePath);

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;

         case '.html':
         contentType = 'text/html';
         break;
    }

   console.log(filePath);
   
   fs.readFile(filePath, (err, content) => {
    if (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    } else {
        res.writeHead(200, { 'Content-Type': contentType }); //200 = OK
        res.end(content, 'utf8');
    }
});
}

exports.returnStaticResource = returnStaticResource;