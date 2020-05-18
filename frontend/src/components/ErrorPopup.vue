<template>
    <div v-if="showPopup">
        <p>{{ errorMessage }}</p>
        <button @click="closePopup">Schließen</button>
    </div>
</template>

<script>
import EventBus from '../eventbus/eventbus'
export default {
    data() {
        return {
            showPopup: false,
            errorMessage: ''
        }
    },
    mounted() {
        EventBus.$on('showErrorPopup', function (errorMessage) {
            this.errorMessage = errorMessage
            this.showPopup = true
        });
    },
    methods: {
        closePopup() {
            this.showPopup = false
        }
    }
}
</script>

