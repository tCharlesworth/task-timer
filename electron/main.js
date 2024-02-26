const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron');
const { setupIPC } = require('./utils/comm');
const CreateMainWindow = require('./mainWindow/mainWindow');


// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// });


const setupTray = () => {
  const trayIcon = nativeImage.createFromPath('electron/images/Clock.png');
  let tray = new Tray(trayIcon);

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Reset Window Position' },
    { label: 'Exit', role: 'quit' }
  ]);

  tray.setContextMenu(trayMenu);

  tray.setToolTip('Task Timer');
  tray.setTitle('Task Timer');

  tray.on('click', ()=>{
    CreateMainWindow();
  });
}


app.whenReady().then(() => {
  setupTray();
  setupIPC();
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateMainWindow();
  }
});


