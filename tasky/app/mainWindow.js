const electron = require('electron');
const { BrowserWindow } = electron;

module.exports = class extends BrowserWindow {
    constructor() {
        super({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            height: 510,
            width: 270,
            frame: false,
            resizable: false,
            show: false,
            skipTaskbar: true,
        });
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }
}

