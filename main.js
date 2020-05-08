const { app, BrowserWindow, ipcMain } = require('electron')
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./renderer/index.html')
  ipcMain.addListener('add-music', (event)=>{
    const addMusicWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true
      },
      parent: mainWindow
    })
    addMusicWindow.loadFile('./renderer/add-music.html')
  })
})