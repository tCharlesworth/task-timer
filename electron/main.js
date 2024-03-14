const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron');
const { setupIPC } = require('./utils/comm');
const { CenterMainWindow, OpenMainWindow, PinMainWindow } = require('./mainWindow/mainWindow');


app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') app.quit()
});


const setupTray = () => {
  const trayIcon = nativeImage.createFromPath('electron/images/Clock.png');
  let tray = new Tray(trayIcon);

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Open', click: OpenMainWindow },
    { label: 'Pin', click: PinMainWindow },
    { label: 'Reset Window Position', click: CenterMainWindow },
    { label: 'Exit', role: 'quit' }
  ]);

  tray.setContextMenu(trayMenu);

  tray.setToolTip('Task Timer');
  tray.setTitle('Task Timer');

  tray.on('click', ()=>{
    OpenMainWindow();
  });
}


app.whenReady().then(() => {
  setupTray();
  setupIPC();
  if (BrowserWindow.getAllWindows().length === 0) {
    OpenMainWindow();
  }
});


