const { createServer } = require('http');
const { parse } = require('url');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

function playAudioAndAnimate(buttonClass) {
    // Modify this part based on your Node.js audio handling logic
    console.log(`Playing audio for drum${buttonClass}`);
    
    // Replace the following line with your logic to trigger animation
    triggerAnimation(`drum${buttonClass}`);
}

function triggerAnimation(buttonClass) {
    // Replace this with your logic for animation in a Node.js environment
    console.log(`Triggering animation for ${buttonClass}`);
}

function numberToAlphabetic(num) {
    if (num < 1 || num > 26) {
        return "Invalid number";
    }
    return String.fromCharCode(96 + parseInt(num));
}

// Create a simple HTTP server
createServer((req, res) => {
    const { pathname } = parse(req.url, true);

    if (pathname === '/index.html') {
        // Serve your HTML file
        readFileAsync('index.html', 'utf8')
            .then((content) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            })
            .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error reading the file: ${err}`);
            });
    } else if (pathname === '/bundle.js') {
        // Serve your bundled JavaScript file
        readFileAsync('bundle.js', 'utf8')
            .then((content) => {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(content);
            })
            .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error reading the file: ${err}`);
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
