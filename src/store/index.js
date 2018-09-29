import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import firebase from 'firebase'
import 'firebase/firestore'
import config from '@/config'

firebase.initializeApp(config)
Vue.use(Vuex)

const state = {
    db: firebase.firestore(),
    user: {}
}

export default new Vuex.Store({
    state,
    modules: {
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
            commit
          }) {
            firebase.auth().onAuthStateChanged(user => {
            this.user = user ? user : {}
                commit('SET_USER', user ? user : {})
            })
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    }
})