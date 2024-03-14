const { BrowserWindow, screen } = require("electron");

let win = null

module.exports = {
  OpenMainWindow: function() {
    if(win) {
      win.focus()
    } else {
      win = new BrowserWindow({
        width: 200,
        height: 300,
        // resizable: false,
        maximizable: false,
        fullscreenable: false
      });

      win.on('close', ()=>{
        win = null
      })

      // win.setMenu(null);
      win.loadFile('./electron/mainWindow/index.html');
    }
  },
  PinMainWindow: function() {
    if(win) {
      const bounds = win.getBounds()
      const currentScreen = screen.getDisplayNearestPoint({ x: bounds.x, y: bounds.y })
      win.setPosition(currentScreen.workAreaSize.width - bounds.width, currentScreen.workAreaSize.height - bounds.height)
    }
  },
  CenterMainWindow: function() {
    if(win) {
      win.center()
    }
  },
  ToggleAlwaysOnTop: function() {
    if(win) {
      win.setAlwaysOnTop(!win.isAlwaysOnTop())
    }
  }
}