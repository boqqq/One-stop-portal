import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user
  },
  state: {
    dialogVisibleAdd: false,
    dialogVisibleEdit: false,
    isRefresh: false
  }
  ,
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      // Object.keys(state).forEach((key) => {
      //   state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      // })
    },
    updateDialogVisibleAdd (state,flag) {
      state.dialogVisibleAdd = flag
    },
    updateDialogVisibleEdit (state,flag) {
      state.dialogVisibleEdit = flag
    },
    updateRefresh (state,flag) {
      state.isRefresh = flag
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
