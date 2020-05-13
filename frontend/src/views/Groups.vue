<template>
    <div class="content">
        <h2>Gruppen:</h2>
        <Group v-for="(group, index) in this.$store.getters.getGroups" :group="group" :groupIndex="index" :key="index"></Group>
        <div class="Progress">
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
      </div>
    </div>
    
</template>

<script>
import Group from '../components/Group'
export default {
    components: {
        Group
    },
    sockets: {
        exchangeRequestWasSent(data) {
            const user = this.$store.getters.getUser
            if(user._id === data.receiver._id) {
                alert(`Sie haben von ${data.sender.username} aus Gruppe ${data.groupIndex} eine Tauschanfrage erhalten!`)
            }
        }
    }
}
</script>

<style scoped>

</style>