const { join } = require('path');
const electron = require('electron');
const { app, ipcMain } = electron;
const TimerTray = require('./app/timerTray');
const MyMainWindow = require('./app/mainWindow');
const package = require('./package.json');

let mainWindow;
let timeTray;

app.on('ready', () => {    
    mainWindow = new MyMainWindow();
    mainWindow.loadURL(join(__dirname, './src/index.html'));
    mainWindow.on('closed', () => app.quit());    

    const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate@2x.png';
    timeTray = new TimerTray(join(__dirname, `./src/assets/${iconName}`), mainWindow, package.version);
    
    console.log('Application up & running');
});

ipcMain.on('update-timer', (event, timeLeft) => {
    timeTray.setTitle(timeLeft);
});