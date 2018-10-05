const tasks = {
  namespaced: true,
  state: {
    tasks: {}
  },
  mutations: {
    ADD_TASKS(state, task) {
      const data = task.data()
      state.tasks = {
        ...state.tasks,
        [task.id]: {
          created: data.created,
          // TODO 値オブジェクト化
          name: data.name,
          state: data.state
        }
      }
    }
  },
  actions: {},
  getters: {
    tasks: state => {
      return state.tasks
    }
  }
}

export default tasks