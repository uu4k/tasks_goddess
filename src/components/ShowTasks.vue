<template>
<div>
    <b-list-group>
        <show-task/>
        <show-task/>
        <show-task/>
    </b-list-group>
</div>
</template>

<script>
import ShowTask from '@/components/ShowTask'
export default {
    name: "ShowTasks",
    components: {
        ShowTask
    }
}
</script>

<style>
</style>
