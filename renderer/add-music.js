const { ipcRenderer } = require('electron')
const path = require('path')
//引入helper.js中定义的$
const { $ } = require('./helper')
let musicFiles = []

//选择音乐按钮点击发送消息给main进程打开文件选择框
$('select-music').addEventListener('click', () => {
    ipcRenderer.send('select-music-files')
})

$('add-music').addEventListener('click', () => {
    if(this.musicFiles){
        ipcRenderer.send('add-music-files', this.musicFiles)
    }
})

const rendererInnerHtml = (pathes) =>{
    //使用reduce完成数组迭代与累加，html就是累积器，music是遍历中的对象，结束时需要return累积器
    const musicListInnerHtml = pathes.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '')
    $('music-list').innerHTML = `<ul class="list-group">${musicListInnerHtml}</ul>`
}

//接收main进程返回的文件列表数据，并进行处理
ipcRenderer.on('selected-files',(event, files) =>{
    this.musicFiles = files
    // console.log(files) //console.log打印到add-music.html窗口console中，使用ctrl+shift+i查看
    rendererInnerHtml(files)
})