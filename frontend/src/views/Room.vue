<template>
    <div class="content">
        <div class="adminPanel">
            <button @click="wait">wait</button>
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
        wait() {
            this.$router.push('/waitjoin')
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
