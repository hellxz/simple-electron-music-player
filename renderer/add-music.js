const { ipcRenderer } = require('electron')
const path = require('path')
//引入helper.js中定义的$
const { $ } = require('./helper')

//选择音乐按钮点击发送消息给main进程打开文件选择框
$('select-music').addEventListener('click', () => {
    ipcRenderer.send('select-music-files')
})

const rendererInnerHtml = (pathes) =>{
    const musicListInnerHtml = pathes.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '')
    $('music-list').innerHTML = `<ul class="list-group">${musicListInnerHtml}</ul>`
}

//接收main进程返回的文件列表数据，并进行处理
ipcRenderer.on('selected-files',(event, files) =>{
    console.log(files) //console.log打印到add-music.html窗口console中，使用ctrl+shift+i查看
    rendererInnerHtml(files)
})