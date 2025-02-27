const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let botProcess = null; // Variável para armazenar o processo do bot

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'public', 'layout.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// Iniciar o bot
ipcMain.on('start-bot', () => {
    if (!botProcess) { 
        botProcess = spawn('node', ['index.js'], { stdio: 'inherit' });

        botProcess.on('exit', (code) => {
            console.log(`Bot finalizado com código: ${code}`);
            botProcess = null;
        });
    }
});

// Parar o bot
ipcMain.on('stop-bot', () => {
    if (botProcess) {
        botProcess.kill(); // Mata o processo do bot
        botProcess = null;
        console.log("Bot parado.");
    }
});
