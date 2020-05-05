<template>
  <div class="content">
    <h2 class="heading">Administrator Einstellungen:</h2>
    <div id=field>
      <input class="input-p" placeholder="Aktuelle Phase" type="text" name="aktuellePhase" v-model="aktuellePhase"/>
      <label for="aktuellePhase">Aktuelle Phase:</label>
    </div>
    <input class="button button-p check" type="button" value="Nächste Phase" @click="nextPhase()"/>
    <input class="button button-p check" type="button" value="Speichern" @click="updateRoom()"/>
    <input class="button button-p check" type="button" value="Raum löschen" @click="deleteRoom()"/>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  props: {},
  data() {
    return {
      aktuellePhase: "-"
    };
  },
  methods: {
    updateRoom() {
      
    },
    deleteRoom() {

    },
    nextPhase() {

    }
  },
};

</script>

<style>
  .roleWrap {
    margin-top: 50px;
  }
</style>