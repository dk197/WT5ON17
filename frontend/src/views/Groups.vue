<template>
    <div class="content">
        <h2>Gruppen:</h2>
        <Group v-for="(group, index) in getAllGroups" :group="group" :groupIndex="index" :key="index"></Group>
        <!-- <div class="Progress">
          <div class="Progress-content">
              <div class="Bar">
              </div>
              <div class="step step1 done">1
              </div>
              <div class="step step2 active">2
              </div>
              <div class="step step3">3
              </div>
          </div>
      </div> -->
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
                });
            }
        }
    }
}
</script>

<style scoped>

</style>