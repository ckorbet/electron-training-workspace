const electron = require('electron');
const { join } = require('path');

const { app, BrowserWindow , Menu } = electron;

let mainWindow;
let addWindow;

const createAddWindow = () => {
    addWindow =  new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add new to-do'
    });
};

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New to-do',
                click() { createAddWindow(); }
            }, {
                label: 'Quit',
                accelerator: (() => {
                    if (process.platform === 'win32') {
                        return 'Ctrl+Shift+Q';
                    } else if (process.platform === 'darwin') {
                        return 'Command+Q';
                    }
                })(),
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform !== 'win32') {
    menuTemplate.unshift({});
}

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

