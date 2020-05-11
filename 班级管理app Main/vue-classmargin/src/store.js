import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// new vuex.store() 创建一个store实例 这个store是用来托管数据的

export default new Vuex.Store({
  state: {
    osLogin: {},
    showBottomNav : true
  },
  mutations: {
    changeOsLogin (state, val) {
      state.osLogin = val
    }
  },
  actions: {

  }
})
