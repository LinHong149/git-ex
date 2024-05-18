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

async function addFiles(repoPath, files) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        const result = await git.add(files);
        return result;
        console.log('Files added to staging area.');
    } catch (error) {
        console.error('Failed to add files:', error);
    }
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