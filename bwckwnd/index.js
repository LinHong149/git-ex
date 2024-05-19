const express = require('express');
const cors = require('cors');
const { initializeRepo, commitChanges, checkStatus, addFiles, readJsonFile} = require('./gitu');
const path = require('path');

const app = express();
const port = 3005;
app.use(express.json());
// Enable CORS for all origins
app.use(cors());

app.post(['/init', '/commit'], async (req, res) => {
    const { path: repoPath, message } = req.body;

    if (!repoPath) {
        return res.status(400).send('Missing repo path');
    }

    let result;
    try {
        if (req.path === '/init') {
            result = await initializeRepo(path.join(__dirname, repoPath));
        } else if (req.path === '/commit') {
            result = await commitChanges(path.join(__dirname, repoPath), message);
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/status', async (req, res) => {
    const {path: repoPath} = req.query;

    if (!repoPath) {
        return res.status(400).send('Missing repo path');
    }

    try {
        const result = await checkStatus(path.join(__dirname, repoPath));
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.put('/add', async (req, res) => {
    const {path: repoPath, files: jsonData, fileName: fileName} = req.body;

    if (!repoPath) {
        return res.status(400).send('Missing repo path');
    }

    try {
        const result = await addFiles(path.join(__dirname, repoPath), JSON.stringify(jsonData), fileName);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/fetch', async (req, res) => {
    const {path: filePath} = req.query;
    try {
        const result = await readJsonFile(path.join(__dirname, filePath));
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Handle other endpoints
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
