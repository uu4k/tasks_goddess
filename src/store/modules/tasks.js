import Task from '@/store/models/task/task'
import Name from '@/store/models/task/name'
import StateFactory from '@/store/models/task/state/statefactory'
import Created from '../models/task/created';
import Id from '../models/task/id';

const tasks = {
  namespaced: true,
  state: {
    tasks: {}
  },
  mutations: {
    ADD_TASK(state, doc) {
      let task = doc.data()
      state.tasks = {
        ...state.tasks,
        [doc.id]: new Task(
            new Id(doc.id),
            new Name(task.name),
            new StateFactory.stateByName(task.state),
            new Created(task.created)
        )
      }
    },
    MOD_TASK(state, doc) {
      let task = doc.data()
      let tasks = { ...state.tasks
      }
      tasks[doc.id] = new Task(
            new Id(doc.id),
            new Name(task.name),
            new State(task.state),
            new Created(task.created)
        )
      state.tasks = tasks
    },
    DEL_TASK(state, doc) {
      let task = doc.data()
      let tasks = { ...state.tasks
      }
      delete tasks[doc.id]
      state.tasks = tasks
    },

  },
  actions: {},
  getters: {
    tasks: state => {
      return state.tasks
    }
  }
}

export default tasks