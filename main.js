const { app, BrowserWindow, ipcMain } = require('electron')
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
  //使用ipcMain接收renderer进程的事件
  ipcMain.on('message', (event, arg)=>{
    console.log(arg)
    //event有一个sender对象来获取发送方，send方法中的第一个事件名可自定义
    // event.sender.send('replyA', '主进程收到了！')
    //event.sender 在这里等价于 mainWindow
    mainWindow.send('replyA', '发送自mainWindow')
  })
})