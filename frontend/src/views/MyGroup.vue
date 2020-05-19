<template>
    <div>
        <h4>{{ groupIndex }}</h4>
        <p v-for="(member, index) in group.participants" :key="index">{{ member.username }} als {{ member.role }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groupIndex: '',
            group: {}
        }
    },
    created() {
        this.groupIndex = this.$store.getters.getUsersGroupIndex
        this.group = this.$store.getters.getGroupByIndex(this.groupIndex)
    }
}
</script>