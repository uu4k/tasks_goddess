<template>
  <div id="app">
    <b-button size="lg" @click="signin" v-if="!user.uid">sign in</b-button>
    <b-button size="lg" @click="signout" v-if="user.uid">sign out</b-button>
    <div id="firebaseui-auth-container"></div>
    <add-task/>
    <show-goddess/>
    <show-tasks :tasks="tasks" />
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

import AddTask from '@/components/AddTask'
import ShowGoddess from '@/components/ShowGoddess'
import ShowTasks from '@/components/ShowTasks'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    AddTask,
    ShowGoddess,
    ShowTasks
  },
  created() {
    this.initAuth()
  },
  methods: {
    ...mapActions({
      signin: 'user/signin', 
      signout: 'user/signout', 
      initAuth: 'user/initAuth'
    })
  },
  computed: {
    localComputed() {},
    ...mapGetters({
      user: 'user/user',
      tasks: 'user/tasks'
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
