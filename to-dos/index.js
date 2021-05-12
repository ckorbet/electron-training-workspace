const electron = require('electron');
const { join } = require('path');

const { app, BrowserWindow , Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

const createAddWindow = () => {
    addWindow =  new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add new to-do',
        icon: join(__dirname, './resources/todoIcon.jpg'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    addWindow.loadURL(join(__dirname, 'add.html'));
    addWindow.on('close', () => addWindow = null);
};

ipcMain.on('todo:add', (event, value) => {
    mainWindow.webContents.send('todo:add', value);
    addWindow.close();
});  

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

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: (() => {
                    if (process.platform === 'win32') {
                        return 'Ctrl+Shift+I';
                    } else if (process.platform === 'darwin') {
                        return 'Command+Alt+Q';
                    }
                })(),
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
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
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    console.log('Application up & running');
});

