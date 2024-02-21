const { ipcMain } = require("electron")
const { getSaveData } = require('./file');

module.exports = {
  setupIPC: () => {
    ipcMain.handle('app:getSaveData', getSaveData);
  }
}