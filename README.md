# 仓库说明
本仓库为学习electron桌面app的笔记，源自慕课网electron开发桌面音乐播放器的课程

主要目的是通过这个课程来更好的为自己开发一个小桌面程序

使用electron-quick-start项目作为基础（改得只剩下package.json变化不大 :smile: ）

## 分支说明
- [x] master: 初始化说明electron，使用BrowserWindow创建两个窗口，启动时同时创建
- [x] second: 使用IPC进行main线程与renderer线程通讯
- [x] begin-dev: 开始准备开发本地音乐播放器，初始化
- [x] create-window-class: 使用ES6 class语法优化前面的代码
- [x] select-music-files：开发选择音乐功能
- [x] get-data-renderer-main：导入音乐，使主界面添加dom列表
- [x] use-electron-store-persist-data：使用electron-store持久化列表数据
- [x] play-music：完成音乐的播放、暂停、换歌等功能

... to be continue

## 使用方式

安装依赖
```bash
yarn
```
> 每次切换分支需执行一次，保证依赖与分支同步
<hr/>

启动
```bash
yarn start
```
<hr/>
打包待续...


