<template>
  <div class="home">
    <router-link to="/create">Raum erstellen</router-link>
    <p>oder</p>
    <input type="text" name="joinToken" id="joinToken" v-model="joinToken" placeholder="Token" />
    <p></p>
    <input type="button" value="Raum beitreten" @click="joinRoom()" />
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
        this.$router.push({ path: `/join/${this.joinToken}` })
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
