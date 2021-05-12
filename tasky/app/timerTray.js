const electron = require('electron');
const { Tray } = electron;

module.exports = class extends Tray {

    constructor(iconPath) {
        super(iconPath);
    }

}