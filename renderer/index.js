const { ipcRenderer } = require('electron')

document.getElementById('add-music-btn').addEventListener('click', ()=>{
    //当添加音乐按钮按下后，添加音乐
    ipcRenderer.send('add-music')
})