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
        await git.init();
        console.log('Initialized a new Git repository.');
    } catch (error) {
        console.error('Failed to initialize repository:', error);
    }
}

async function addFiles(repoPath, files) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        await git.add(files);
        console.log('Files added to staging area.');
    } catch (error) {
        console.error('Failed to add files:', error);
    }
}

async function commitChanges(repoPath, commitMessage) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        await git.commit(commitMessage);
        console.log('Changes committed with message:', commitMessage);
    } catch (error) {
        console.error('Failed to commit changes:', error);
    }
}

async function checkStatus(repoPath) {
    await ensureDirectoryExists(repoPath);
    const git = simpleGit(repoPath);
    try {
        const status = await git.status();
        console.log('Repository status:', status);
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