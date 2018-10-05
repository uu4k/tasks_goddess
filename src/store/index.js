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

export default new Vuex.Store({
  state: {
    db: firebase.firestore(),
  },
  modules: {
    user: user,
    tasks: tasks
  },
  actions: {},
  mutations: {},
  getters: {}
})
