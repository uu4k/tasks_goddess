import firebase from 'firebase'
import 'firebase/firestore'

const user = {
  namespaced: true,
  state: {
    user: {}
  },
  modules: {},
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
        task, {
          root: true
        }
      ))
    },
  },
  getters: {
    user: state => {
      return state.user
    },
    tasks: (state, getters, rootState, rootGetters) => {
      return rootGetters['tasks/tasks']
    }
  }
}

export default user
