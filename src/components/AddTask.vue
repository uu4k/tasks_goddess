<template>
<div>
    <b-button size="lg" variant="danger" @click="newTaskVisible=!newTaskVisible">+</b-button>
    <b-form-input v-model="newTask"
                  v-if="newTaskVisible"
                  type="text"
                  @keyup.enter.native="send"
                  placeholder="Enter your task"></b-form-input>
</div>
</template>

<script>
export default {
  name: 'AddTask',
  data() {
    return {
      newTask: '',
      newTaskVisible: false
    }
  },
  components: {},
  methods: {
    send() {
      // TODO ぼたんぐるぐる
      this.$store
        .dispatch('user/sendTask', {
          name: this.newTask
        })
        .then(res => {
          console.log('Task sent.')
          this.newTaskVisible = false
          // TODO message?表示
          // TODOリストの再読込はonsnapshotでやるためここでは不要
        })
        .catch(err => {
          console.log('Error', err)
        })
      // TODO ぼたんぐるぐるやめ
    }
  }
}
</script>

<style>
</style>
