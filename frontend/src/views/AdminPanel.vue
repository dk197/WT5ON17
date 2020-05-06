<template>
  <div class="content">
    <h2 class="heading">Admin-Einstellungen:</h2>
    <div id=field>
      <input class="input-p" placeholder="Aktuelle Phase" type="text" name="aktuellePhase" v-model="aktuellePhase"/>
      <label for="aktuellePhase">Aktuelle Phase:</label>
    </div>
    <input class="button button-p check" type="button" value="Nächste Phase" @click="nextPhase()"/>
    <input class="button button-p check" type="button" value="Speichern" @click="save()"/>
    <input class="button button-p check" type="button" value="Raum löschen" @click="deleteRoom()"/>
    <input class="button button-p check" type="button" value="Zurück" @click="back()"/>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminPanel",
  props: {},
  data() {
    return {
      aktuellePhase: "-"
    };
  },
  methods: {
    save() {
      
    },
    async deleteRoom() {
       try {
        await axios.delete(`http://localhost:3000/rooms/${this.$store.getters.getRoom._id}`)
        this.$store.commit('setRoomToken', "")
        this.$store.commit('setRoom', "")
        this.$router.push('/')
      } catch (e) {
        console.log(e);
      }  
    },
    nextPhase() {

    },
    back() {
      this.$router.go(-1);
    }
  },
};

</script>

<style>
  .roleWrap {
    margin-top: 50px;
  }
</style>