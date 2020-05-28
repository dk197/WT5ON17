<template class="home">
  <div class="home">
    <input class="input input-p" type="text" name="joinToken" id="joinToken" v-model="joinToken" placeholder="Gruppenkey" />
    <div class="alignright">
      <input class="button button-p" type="button" value="Beitreten" @click="joinRoom()" />
    </div>
    <h3 class="text-left">Gruppe bilden</h3>
    <p class="text-left">Du bist Dozent oder verantwortlich für die Gruppenbildung? Hier kannst du eine Gruppe erstellen. Keine Sorge, du kannst auch direkt selbst bei der Bildung der Gruppen teilnehmen!</p>
    <div class="alignright">
      <router-link class="button button-s link" to="/create">Erstellen</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "Room",
    props: {},
    data() {
        return {
            joinToken: ""
        };
    },
    created() {
        this.$store.commit('resetRoom')
    },
    methods: {
        async joinRoom() {
          this.$router.push({ path: `/join/${this.joinToken}` });
        }
    }
};
</script>

<style>
  .home {
    margin: 100px 40px 40px 40px;
}

.home > div:nth-child(2) > div {
  display: none;
}
</style>
