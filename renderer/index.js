const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

$('add-music-btn').addEventListener('click', ()=>{
    //当添加音乐按钮按下后，添加音乐
    ipcRenderer.send('add-music')
})

const rendererHtml = (tracks) => {
    const updateTracks = $('track-list')
    const tracksHtml = tracks.reduce((html, track) => {
        //使用d-flex开启bootstrap flex布局, row表示使用grid行布局
        html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center">
            <div class="col-10">
                <i class="fas fa-music mr-2 text-secondary"></i>
                <b>${track.fileName}</b>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-4"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </li>`
        return html
    }, '')
    const emptyPlayList = '<div class="alert alert-primary">还没有添加音乐哦</div>'
    updateTracks.innerHTML = tracks.length ? `<ul class="list-group">${tracksHtml}</ul>` : emptyPlayList
}

ipcRenderer.on('update-tracks', (event, tracks) => {
    rendererHtml(tracks)
})

