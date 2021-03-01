
// 封装操作localstorage 本地存储的方法 模块化

let storage = {
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key){
    return JSON.parse(localStorage.getItem(key))
  },
  getForIndex(index){
    return localStorage.key(index)
  },
  getKeys(){
    let items = this.getAll()
    let keys = []
    for(let index = 0;index<items.length;index++){
      keys.push(items[index].key)
    }
  },
  getLength(){
    return localStorage.length
  },
  getSupport(){
    return (typeof (Storage) !== "undefined")
  },
  remove(key){
    localStorage.removeItem(key)
  },
  removeAll(){
    localStorage.clear()
  },
  getAll(){
    let len = localStorage.length
    let arr = []
    for(let i = 0;i<len;i++){
      // 获取key
      let getKey = localStorage.key(i)
      // 获取key对应的值
      let getVal = localStorage.getItem(getKey)
      //放入数组
      arr[i] = {
        'key' : getKey,
        'val' : getVal,
      }
    }
    return arr
  }
}

export default storage
