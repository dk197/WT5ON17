<template>
    <div class="hello">
        <h1>Groupify</h1>
        <button @click="admin" v-if="this.$store.getters.getAdminStatus">admin Panel</button>
        <button @click="wait">wait</button>
    </div>
</template>

<script>
export default {
    name: "Room",
    props: {},
    data() {
        return {};
    },
    methods: {
        admin() {
            this.$router.push('/admin')
        },
        wait() {
            this.$router.push('/waitjoin')
        }
    },
    components: {},
};
</script>
