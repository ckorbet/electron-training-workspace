const electron = require('electron');
const { join } = require('path');

const { app, BrowserWindow , ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: join(__dirname, './resources/todoIcon.jpg')
    });
    mainWindow.loadURL(join(__dirname, 'main.html'));
    console.log('Application up & running');
});