const { app, BrowserWindow, ipcMain, dialog } = require('electron')

//窗口类写法
class AppWindow extends BrowserWindow{
  constructor(config, loadFilePath){
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    //合并配置类，basicConfig中同名的项会被config所替代
    // const finalConfig = Object.assign(basicConfig, config)
    //以上写法等同
    const finalConfig = {...basicConfig, ...config}
    super(finalConfig)
    this.loadFile(loadFilePath)

    //减少加载闪烁
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({},'./renderer/index.html')
  ipcMain.on('add-music', (event)=>{
    const addMusicWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    },'./renderer/add-music.html')
  })
  ipcMain.on('select-music-files', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }).then(result => {
      if(result.filePaths){
        // console.log(result.filePaths)
        event.sender.send('selected-files', result.filePaths)
      }
    }).catch(err => {
      console.log(err)
    })
  })
})