<template>
<div>
    <b-button size="lg" variant="danger" @click="newTaskVisible=!newTaskVisible">+</b-button>
    <b-form-input v-model="newTask"
                  v-if="newTaskVisible"
                  type="text"
                  placeholder="Enter your task"></b-form-input>
</div>
</template>

<script>
export default {
    name: "AddTask",
    data () {
        return {
            newTask: "",
            newTaskVisible: false
        }
    },
    components: {
    }
}
</script>

<style>
</style>
