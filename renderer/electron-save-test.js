const Store = require('electron-store');

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined

const DataSave = require('./data-store')
const testSave = new DataSave()
const array = ['111','222']
testSave.addTracks(array)
//数据默认存储在app.getPath('userData')目录下的config.json中，如果指定DataSave(Store)的name，则在name.json中
console.log(testSave.getTracks())
