const { join } = require('path');
const electron = require('electron');
const { app, ipcMain, BrowserWindow } = electron;
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');
ffmpeg.setFfprobePath("C:\\Users\\catorres\\SOFTWARE\\FFMPEG\\ffmpeg-20200831-4a11a6f-win64-static\\bin\\ffprobe.exe");

let mainWindow;

app.on('ready', () => {    
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        },
        height: 600,
        width: 800,
        webPreferences: { backgroundThrottling: false}
    });
    mainWindow.loadURL(join(__dirname, './src/index.html'));
    mainWindow.on('closed', () => app.quit());    

    console.log('');
    console.log('Application up & running');
    console.log('');
});

ipcMain.on('videos:added', (event, videos) => {
    const promises = _.map(videos, video => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(video.path, (err, metadata) => {
                if(err) {
                    reject(err);
                }
                video.duration = metadata.format.duration;
                video.format = 'avi';
                resolve(video);
            }); 
        });
    });

    Promise.all(promises).then(results => {
        mainWindow.webContents.send('metadata:complete', results);
    });
    
});