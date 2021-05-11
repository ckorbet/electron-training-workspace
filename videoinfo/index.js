const electron = require('electron');
const { join } = require('path');

const { app, BrowserWindow } = electron;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadURL(join(__dirname, 'index.html'));
    console.log('Application up & running');
});