const { app } = require('electron');
const electron = require('electron');
const { Tray, Menu } = electron;

module.exports = class extends Tray {

    constructor(iconPath, mainWindow, version) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
        this.setToolTip(`Timer App ${version}`);
    }

    onClick(event, bounds) {
        const { x, y } = bounds;
        const {height, width } = this.mainWindow.getBounds();

        if(this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            let xPos, yPos;
            if(process.platform === 'win32') {
                yPos = y - height;
                xPos = x + 50;
            } else {
                yPos = y;
                xPos = x - width / 2;
            }
            this.mainWindow.setBounds({
                x: xPos,
                y: yPos,
                height,
                width
            });
            this.mainWindow.show();
        }
    }

    onRightClick(event) {
        this.popUpContextMenu(Menu.buildFromTemplate([
            {
                label: 'Quit',
                click(){ app.quit(); }
            }
        ]))
    }

}