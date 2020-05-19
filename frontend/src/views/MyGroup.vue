<template>
    <div>
        <h4>{{ groupIndex+1 }}</h4>
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
        if(this.groupIndex === undefined && this.$store.getters.getAdminStatus) {
            this.$router.push('/groups')
        }else if(this.groupIndex === undefined) {
            this.$router.go(-1)
        }
        this.group = this.$store.getters.getGroupByIndex(this.groupIndex)
    }
}
</script>