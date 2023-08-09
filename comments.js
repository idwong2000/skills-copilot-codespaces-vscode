// create web server
// listen to port 3000
// when request comes in, read the file
// send the content of the file
// if error, send 404
// if success, send content of the file

// 1. require http module
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

// 2. create server
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    if (pathName === '/comments' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify(query));
    } else if (pathName === '/form' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        fs.readFile(`${__dirname}/form.html`, 'utf-8', (err, data) => {
            res.end(data);
        });
    } else if (pathName === '/form' && req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(`
                <h1>Thanks for your feedback</h1>
                <p>${body}</p>
            `);
        });
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found</h1>');
    }
});
