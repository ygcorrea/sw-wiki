import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nightMode: false,
  },
  mutations: {
    setNightMode (state, param) {
     state.nightMode = param
    }
  },
  actions: {
  },
  modules: {
  }
})
