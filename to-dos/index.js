const electron = require('electron');
const { join } = require('path');

const { app, BrowserWindow , Menu } = electron;

let mainWindow;

const menuTemplate = [
    {
        label: 'File'
    }, {
        label: 'Carlos'
    }
];

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: join(__dirname, './resources/todoIcon.jpg')
    });
    mainWindow.loadURL(join(__dirname, 'main.html'));

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    console.log('Application up & running');
});

