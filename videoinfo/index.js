const electron = require('electron');
const { join } = require('path');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath("C:\\Users\\catorres\\SOFTWARE\\FFMPEG\\ffmpeg-20200831-4a11a6f-win64-static\\bin\\ffprobe.exe");

const { app, BrowserWindow , ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: join(__dirname, './resources/icon.png')
    });
    mainWindow.loadURL(join(__dirname, 'index.html'));
    console.log('Application up & running');
});

ipcMain.on('video:submit', (event, path) =>{    
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('Video duration is: ', metadata.format.duration);
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});