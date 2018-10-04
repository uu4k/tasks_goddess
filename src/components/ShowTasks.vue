<template>
<div>
    <b-list-group>
        <show-task
        v-for="task in tasks" :task="task" :key="task.id"
        />
    </b-list-group>
</div>
</template>

<script>
import ShowTask from '@/components/ShowTask'
export default {
  name: 'ShowTasks',
  components: {
    ShowTask
  },
  props: {
    tasks: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
