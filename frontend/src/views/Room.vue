<template>
    <div class="hello">
        <h1>Groupify</h1>
        <button @click="admin">admin Panel</button>
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
        }
    },
    components: {},
};
</script>
