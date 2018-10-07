import firebase from 'firebase'
import 'firebase/firestore'

import Task from '@/models/task/task'
import Name from '@/models/task/name'
import StateFactory from '@/models/task/state/statefactory'
import Created from '@/models/task/created';

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
      // TODO データソース層として分離
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
      let addTask = new Task(
        null,
        new Name(name),
        new StateFactory.stateByName(taskstate),
        new Created(created)
      )

      // TODO refactoring
      let addTaskData = addTask.toHash()
      addTaskData['uid'] = state.user.uid

      // TODO データソース層として分離
      return rootState.db
        .collection('tasks')
        .add(addTaskData)
    },
    async fetchTasks({
      commit,
      state,
      rootState
    }) {
      // TODO データソース層として分離
      let taskRef = rootState.db.collection('tasks').where('uid', '==', state.user.uid)
      let tasks = await taskRef.get()

      // TODO ファーストコレクションとかにできないか検討
      tasks.forEach(task => commit('tasks/ADD_TASK',
        task, {
          root: true
        }
      ))

      // TODO データソース層として分離
      rootState.db.collection('tasks').where('uid', '==', state.user.uid).onSnapshot((snapshot) => {
        snapshot.docChanges.forEach((change) => {
          if (change.type === "added") {
            commit('tasks/ADD_TASK',
              change.doc, {
                root: true
              }
            )
          }
          if (change.type === "modified") {
            commit('tasks/MOD_TASK',
              change.doc, {
                root: true
              }
            )
          }
          if (change.type === "removed") {
            commit('tasks/DEL_TASK',
              change.doc, {
                root: true
              }
            )
          }
        })
      })
    }
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
