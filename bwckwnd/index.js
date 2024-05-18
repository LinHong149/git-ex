const { createServer } = require('node:http');
const url = require('url');
const { initializeRepo, addFiles, commitChanges, checkStatus } = require('./gitu');
const pathModule = require('path');

const hostname = '0.0.0.0';
const port = 3000;


const server = createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;

    res.setHeader('Content-Type', 'text/plain');

    if (path === '/init' && req.method === 'GET') {
        const repoPath = pathModule.join(__dirname, query.path);
        if (!repoPath) {
            res.statusCode = 400;
            res.end('Missing repo path');
        } else {
            const result = await initializeRepo(repoPath);
            res.statusCode = 200;
            res.end(result);
        }
    } else if (path === '/status' && req.method == 'GET') {
        const repoPath = pathModule.join(__dirname, query.path);
        if (!repoPath) {
            res.statusCode = 400;
            res.end('Missing repo path');
        } else {
            const result = await checkStatus(repoPath);
            res.statusCode = 200;
            res.end(result);
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
