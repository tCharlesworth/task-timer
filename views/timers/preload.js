const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  getSaveData: () => ipcRenderer.invoke('app:getSaveData')
})