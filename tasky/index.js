const electron = require('electron');
const { join } = require('path');
const { app, BrowserWindow } = electron;
const TimerTray = require('./app/timerTray');

let mainWindow;
let tray;

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
    tray = new TimerTray(join(__dirname, `./src/assets/${iconName}`));
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        const {height, width } = mainWindow.getBounds();

        if(mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            let xPos, yPos;
            if(process.platform === 'win32') {
                yPos = y - height;
                xPos = x + 50;
            } else {
                yPos = y;
                xPos = x - width / 2;
            }
            mainWindow.setBounds({
                x: xPos,
                y: yPos,
                height,
                width
            });
            mainWindow.show();
        }        
    });

    console.log('Application up & running');
});