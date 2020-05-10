const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const DataStore = require('./renderer/data-store')
let myStore = new DataStore({'name':'MusicData'})

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
  mainWindow.setMenuBarVisibility(false)
  //使用webContents的did-finish-load事件来达到启动时加载功能
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('update-tracks' , myStore.getTracks())
  })
  //添加音乐按钮点击事件
  ipcMain.on('add-music', ()=>{
    const addMusicWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    },'./renderer/add-music.html')
  })
  //选择音乐文件按钮点击事件
  ipcMain.on('select-music-files', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }).then(result => {
      if(result.filePaths){
        event.sender.send('selected-files', result.filePaths)
      }
    }).catch(err => {
      console.log(err)
    })
  })
  //添加音乐文件到主窗口列表事件
  ipcMain.on('add-music-files', (event, filePaths) => {
    //保存数据
    const updateMusicTrack = myStore.addTracks(filePaths).saveTracks().getTracks()
    // console.log(updateMusicTrack)
    mainWindow.send('update-tracks', updateMusicTrack)
  })
  //查看electron-store将数据持久化的位置，Linux系统在 ~/.config/应用名/ 下
  console.log(app.getPath('userData'))
})