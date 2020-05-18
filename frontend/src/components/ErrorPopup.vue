<template>
    <div v-if="this.$store.getters.getErrorPopupStatus">
        <p>{{ this.$store.getters.getErrorMessage }}</p>
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

