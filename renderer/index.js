const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const DataStore = require('./data-store')
const myStore = new DataStore({'name': 'MusicData'})

let musicAudio = new Audio()
let allMusicTracks
let currentMusicTrack

$('add-music-btn').addEventListener('click', () =>{
    //当添加音乐按钮按下后，添加音乐
    ipcRenderer.send('add-music-btn')
})
//播放音乐
$('track-list').addEventListener('click', (event) => {
    //禁用默认行为
    event.preventDefault
    //使用classList操作DOM对象，使用dataset获取
    const { dataset, classList} = event.target
    const id = dataset && dataset.id //dataset存在并且有id时赋值
    //点击播放按钮
    if(id && classList.contains('fa-play')){
        //查找音乐数组，替换src播放音乐
        const clickTrack = allMusicTracks.find(track => track.id === id)
        if(!currentMusicTrack || (currentMusicTrack && clickTrack.id !== currentMusicTrack.id)){
            //当初次播放或本次点击与当前播放不同id时，替换音频文件
            currentMusicTrack = clickTrack
            musicAudio.src = currentMusicTrack.path
        }
        musicAudio.play()
        classList.replace('fa-play', 'fa-pause')
    }
    else if(id && classList.contains('fa-pause')){
        //点暂停按钮
        musicAudio.pause()
        classList.replace('fa-pause', 'fa-play')
    }else if(id && classList.contains('fa-trash-alt')){
        //点垃圾筒
        // myStore.removeTrackById(id)
        // if(currentMusicTrack && currentMusicTrack.id === id){
        //     musicAudio.pause
        //     musicAudio.src = ''
        //     currentMusicTrack = null
        // }
        // allMusicTracks.splice(allMusicTracks.findIndex(item => item.id === id), 1)
        //TODO 删除dom
        console.log($(`'.${id}'`))

    }
})

const rendererHtml = (tracks) => {
    const updateTracks = $('track-list')
    const tracksHtml = tracks.reduce((html, track) => {
        /*
        1.使用d-flex开启bootstrap flex布局, row表示使用grid行布局
        2.通过data-set设置自定义参数，便于js获取
        3.事件冒泡机制，当多层容器中产生事件，会向上传递，直到html才进行处理，因此，可以将事件绑定在父容器上，以减少重复绑定事件
        */
        html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center ${track.id}">
            <div class="col-10">
                <i class="fas fa-music mr-2 text-secondary"></i>
                <b>${track.fileName}</b>
            </div>
            <div class="col-2">
                <i class="fas fa-play mr-4" data-id="${track.id}"></i>
                <i class="fas fa-trash-alt" data-id="${track.id}"></i>
            </div>
        </li>`
        return html
    }, '')
    const emptyPlayList = '<div class="alert alert-primary">还没有添加音乐哦</div>'
    updateTracks.innerHTML = tracks.length ? `<ul class="list-group">${tracksHtml}</ul>` : emptyPlayList
}

ipcRenderer.on('update-tracks', (event, tracks) => {
    rendererHtml(tracks)
    allMusicTracks = tracks
    console.log('index.js-tracks:'+tracks)
    console.log('index.js-allMusicTracks:', allMusicTracks)
})

