const { app, BrowserWindow } = require('electron')
app.allowRendererProcessReuse = true
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  const secondWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    parent: mainWindow //支持父窗口关闭时，同时关闭子窗口
  })
  secondWindow.loadFile('second.html')
})