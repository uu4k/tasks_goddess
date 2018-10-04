<template>
<b-list-group-item active>{{ task.name }}</b-list-group-item>
</template>

<script>
export default {
  name: 'ShowTask',
  components: {},
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
