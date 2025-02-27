const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    startBot: () => ipcRenderer.send('start-bot'),
    stopBot: () => ipcRenderer.send('stop-bot')
});
