<template>
    <div class="content">
        <div class="adminPanel">
            <button class="adminPanel-Button" @click="admin">Admin</button>
        </div>
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

<style scoped>
    .adminPanel {
        text-align: right;
        margin-top: -20px;
        margin-right: -20px;
    }
    .adminPanel-Button {
        background-color: transparent;
        border: none;
        color: #094440;
        background-image: url('../assets/icons/gear.svg');
        background-repeat: no-repeat;
        padding-left: 28px;
        padding-top: 3px;
        font-size: 16px;
        font-weight: 600;
    }
</style>
