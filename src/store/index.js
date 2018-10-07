import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import firebase from 'firebase'
import 'firebase/firestore'
import config from '@/config'

firebase.initializeApp(config)
Vue.use(Vuex)

import user from "@/store/modules/user"
import tasks from "@/store/modules/tasks"


// repository初期化
const db = firebase.firestore()
// TODO いい感じにDIしたい
import TaskRepository from '@/repositories/task-repository'
TaskRepository.init(db)

export default new Vuex.Store({
  state: {
    db: db,
  },
  modules: {
    user: user,
    tasks: tasks
  },
  actions: {},
  mutations: {},
  getters: {}
})
