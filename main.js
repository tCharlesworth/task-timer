const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron');
const { setupIPC } = require('./utils/comm');

function CreateTimerWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 300,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  });

  win.setMenu(null);

  win.loadFile('views/timers/index.html');
}


// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// });


const setupTray = () => {
  const trayIcon = nativeImage.createFromPath('images/Clock.png');
  let tray = new Tray(trayIcon);

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Reset Window Position' },
    { label: 'Exit', role: 'quit' }
  ]);

  tray.setContextMenu(trayMenu);

  tray.setToolTip('Task Timer');
  tray.setTitle('Task Timer');

  tray.on('click', ()=>{
    CreateTimerWindow();
  });
}


app.whenReady().then(() => {
  setupTray();
  setupIPC();
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateTimerWindow();
  }
});


