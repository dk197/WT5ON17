<template>
    <div class="content">
        <h2>Gruppen:</h2>
        <Group v-for="(group, index) in getAllGroups" :group="group" :groupIndex="index" :key="index"></Group>
    </div>
    
</template>

<script>
import Group from '../components/Group'
export default {
    computed: {
        getAllGroups() {
            return this.$store.state.groups
        }
    },
    components: {
        Group
    },
    sockets: {
        exchangeRequestWasSent(data) {
            const user = this.$store.getters.getUser
            this.$store.commit('addExchangingUser', data.sender._id)
            this.$store.commit('addExchangingUser', data.receiver._id)
            if(user._id === data.receiver._id) {
                console.log('data', data);
                this.$confirm(
                    `Sie haben von ${data.sender.username} aus Gruppe ${data.groupIndex} eine Tauschanfrage erhalten! Annehmen?`
                ).then(() => {
                    this.$socket.emit("exchangeWasAccepted", {
                        token: this.$store.getters.getRoomToken,
                        sender: data.sender,
                        senderGroupIndex: data.groupIndex,
                        receiver: user
                    });
                }).catch((e) => {
                    console.log(e);
                    this.$socket.emit("exchangeWasDeclined", {
                        token: this.$store.getters.getRoomToken,
                        sender: data.sender,
                        receiver: user
                    });
                })
            }
        }
    }
}
</script>

<style scoped>

</style>