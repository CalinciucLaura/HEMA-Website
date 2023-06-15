const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'pages', req.url);

    // Check if requested URL is a specific page
    if (req.url === '/') {
        filePath = path.join(__dirname, 'pages','Main', 'Main.html');
        console.log("1");
    // } else if (req.url === '/pages/About') {
    //     filePath = path.join(__dirname, '/about.html');
    // } else if (req.url === '/pages/House') {
    //     filePath = path.join(__dirname, '/House.html');
    // } else { 
    //     filePath = path.join(__dirname, req.url);
    //     console.log("2");
    // }
    }

    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(5500, () => {
  console.log('Server is running on port 5500');
});
