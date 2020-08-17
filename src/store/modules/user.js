export default {
  namespaced: true,
  state: {
    id: 0,
    name: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = 111
    },
    updateName (state, name) {
      state.name = name
    }
  }
}
