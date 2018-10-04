import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import firebase from 'firebase'
import 'firebase/firestore'
import config from '@/config'

firebase.initializeApp(config)
Vue.use(Vuex)

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

const user = {
  namespaced: true,
  state: {
    user: {}
  },
  modules: {
    tasks: tasks
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    signin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signout() {
      firebase.auth().signOut()
    },
    initAuth({
      commit,
      dispatch
    }) {
      // FirebaseAuthenticationのログイン状態の変更時の処理を追加.
      // なお、ページ表示時にも動作する
      firebase.auth().onAuthStateChanged(user => {
        commit('SET_USER', user ? user : {})
        if (user) {
          dispatch('fetchTasks')
        }
      })
    },
    sendTask({
      state,
      commit,
      rootState
    }, {
      name,
      created,
      taskstate
    }) {
      return rootState.db
        .collection('tasks')
        .add({
          name: name,
          created: created || Date.now(),
          state: taskstate || 'todo',
          uid: state.user.uid
        })
    },
    async fetchTasks({
      commit,
      state,
      rootState
    }) {
      let taskRef = rootState.db.collection('tasks').where('uid', '==', state.user.uid)
      let tasks = await taskRef.get()

      tasks.forEach(task => commit('tasks/ADD_TASKS',
        task
      ))
    },
  },
  getters: {
    user: state => {
      return state.user
    },
    tasks: state => {
      // TODO tasksモジュールからgetter出とってこれるようにする
      return state.tasks.tasks
    }
  }
}

export default new Vuex.Store({
  state: {
    db: firebase.firestore(),
  },
  modules: {
    user: user
  },
  actions: {},
  mutations: {},
  getters: {}
})
