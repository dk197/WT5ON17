<template class="home">
  <div class="home">
    <input class="input input-p" type="text" name="joinToken" id="joinToken" v-model="joinToken" placeholder="Gruppenkey" />
    <div class="alignright">
      <input class="button button-p" type="button" value="Beitreten" @click="joinRoom()" />
    </div>
    <h3 class="text-left">Gruppe bilden</h3>
    <p class="text-left">Du bist Dozent oder Verantwortlich für die Gruppenbildung? Hier kannst du eine Gruppe erstellen. Keine Sorge, du kannst auch direkt selbst bei der Bildung der Gruppen teilnehmen!</p>
    <div class="alignright">
      <router-link class="button button-s link" to="/create">Erstellen</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Room",
  props: {},
  data() {
    return {
        joinToken: ""
    };
  },
  methods: {
      async joinRoom() {
      try {
        const response = await axios.get(`http://localhost:3000/rooms/${this.joinToken}`)
        console.log(response)
        this.$store.commit('setRoomToken', response.data.token)
        this.$store.commit('setRoom', response.data)
        this.$router.push({ path: `/join/${this.joinToken}` })
        this.$store.commit('setParticipant')
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>
  .home {
    margin: 200px 40px 40px 40px;
}

.home > div:nth-child(2) > div {
  display: none;
}
</style>
