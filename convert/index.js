const { join } = require('path');
const electron = require('electron');
const { app, ipcMain, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {    
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        height: 600,
        width: 800,
        webPreferences: { backgroundThrottling: false}
    });
    mainWindow.loadURL(join(__dirname, './src/index.html'));
    mainWindow.on('closed', () => app.quit());    

    console.log('Application up & running');
});

// ipcMain.on('update-timer', (event, timeLeft) => {
//     timeTray.setTitle(timeLeft);
// });