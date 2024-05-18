const simpleGit = require('simple-git');
const fs = require('fs');

async function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

async function initializeRepo(repoPath) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        const result = await git.init();
        return result;
        console.log('Initialized a new Git repository.');
    } catch (error) {
        console.error('Failed to initialize repository:', error);
    }
}

async function addFiles(repoPath, jsonData) {
    await ensureDirectoryExists(repoPath);
    const tmpFilePath = `${repoPath}/temp.json`;
    fs.writeFileSync(tmpFilePath, jsonData);
    const git = simpleGit(repoPath);
    const result = git.add(tmpFilePath, (err) => {
        if (err) {
            console.error('Failed to add file to staging area:', err);
            return;
        }
        console.log('File added to staging area.');
        fs.unlinkSync(tmpFilePath);
        console.log('Temporary file removed.');
    });
    return result;
}

async function commitChanges(repoPath, commitMessage) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        const result = await git.commit(commitMessage);
        console.log('Changes committed with message:', commitMessage);
        return result;
    } catch (error) {
        console.error('Failed to commit changes:', error);
    }
}

async function checkStatus(repoPath) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        const result = await git.status();
        console.log('Repository status:', result);
        return result;
    } catch (error) {
        console.error('Failed to check status:', error);
    }
}

module.exports = {
    initializeRepo,
    addFiles,
    commitChanges,
    checkStatus,
};