<template>
  <div class="home">
    <a href="/create">Raum erstellen</a>
    <p></p>
    <input type="button" value="Raum beitreten" @click="joinRoom()" />
    <input
      type="text"
      name="joinToken"
      id="joinToken"
      v-model="joinToken"
    />
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      joinToken: ""
    };
  },
  methods: {
    async joinRoom() {
      // try {
      //   const response = await axios.post(
      //     "http://localhost:3000/rooms",
      //     this.form
      //   );
      //   this.form.generatedToken = response.data.token;
      // } catch (e) {
      //   console.log(e);
      // }
    }
  }
};
</script>
