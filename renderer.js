const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', ()=>{
    //renderer进程通过ipcRenderer传递消息给ipcMain从而让main.js获取到事件
    ipcRenderer.send('message', 'hello from renderer process')
    ipcRenderer.on('replyA', (event, arg)=>{
        document.getElementById('message').innerHTML = arg
    })
})