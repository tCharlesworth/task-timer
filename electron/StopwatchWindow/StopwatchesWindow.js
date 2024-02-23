const { BrowserWindow } = require("electron");

module.exports = function CreateStopwatchWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 300,
    // resizable: false,
    maximizable: false,
    fullscreenable: false
  });

  // win.setMenu(null);

  win.loadFile('./electron/StopwatchWindow/index.html');
}