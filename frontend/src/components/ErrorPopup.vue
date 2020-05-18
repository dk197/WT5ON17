<template>
    <div v-if="this.$store.getters.getErrorPopupStatus">
        <p v-for="(error, index) in this.$store.getters.getErrors" :key="index">{{error}}</p>
        <button @click="closePopup">Schließen</button>
    </div>
</template>

<script>
export default {
    methods: {
        closePopup() {
            this.$store.commit('toggleErrorPopup')
        }
    }
}
</script>

