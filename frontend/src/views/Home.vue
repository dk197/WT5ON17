<template>
  <div class="home">
    <router-link class="button button-p link" to="/create">Raum erstellen</router-link>
    <p>oder</p>
    <input class="input input-p" type="text" name="joinToken" id="joinToken" v-model="joinToken" placeholder="Token" />
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
        this.$store.commit('setRoomToken', response.data.room.token)
        this.$store.commit('setRoom', response.data.room)
        this.$router.push({ path: `/join/${this.joinToken}` })
        this.$store.commit('setParticipant')
        response.data.users.forEach(user => {
          this.$store.commit('addUser', {
                username: user.username,
                role: user.role
            })
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>
  .home {
    margin: 40px;
    
  }
</style>
