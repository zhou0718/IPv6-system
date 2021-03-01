import Vue from 'vue'
import Vuex from 'vuex'
import storage from "../utils/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    Row:{}
  },
  mutations: {
    set_token(state,token){
      state.token = token
      storage.set('token',token)
      console.log('token保存成功');
    },
    del_token(state){
      state.token = ''
      storage.remove('token')
    },
    SET_ROW(state, value){
      state.Row = value
    }
  },
  actions: {
    getRow(state, value){

    }
  },
  modules: {
  }
})
