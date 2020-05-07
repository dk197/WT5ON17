<template>
    <div>
        <p>Gruppen:</p>
        <Group v-for="(group, index) in this.$store.getters.getGroups" :group="group" :index="index" :key="index"></Group>
    </div>
</template>

<script>
import Group from '../components/Group'
export default {
    components: {
        Group
    }
}
</script>

<style scoped>

</style>