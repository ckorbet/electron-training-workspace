const electron = require('electron');
const { join } = require('path');
const { app, BrowserWindow } = electron;
const TimerTray = require('./app/timerTray');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        height: 510,
        width: 270,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(join(__dirname, './src/index.html'));
    mainWindow.on('closed', () => app.quit());

    const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate@2x.png';
    new TimerTray(join(__dirname, `./src/assets/${iconName}`), mainWindow);
    
    console.log('Application up & running');
});