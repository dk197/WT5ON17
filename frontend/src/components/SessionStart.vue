<template>
  <div class="hello">
    <h1>Groupify</h1>

    <p></p>
    <label for="minGroupSizeInput">Minimale Gruppengröße: </label>
    <input type="number" name="minGroupSizeInput" v-model="minGroupSize">
    <p style="height: 10px"></p>

    <label for="roleNameInput">Name der Rolle: </label>
    <input type="text" name="roleNameInput" v-model="roleName">
    <p></p>
    <label for="minRoleAmountInput">Minimale Anzahl der Rolle: </label>
    <input type="number" name="minRoleAmountInput" v-model="minRoleAmount">
    
    <p style="height: 10px"></p>
    <input type="button" value="Raum erstellen" @click="generateToken()">
    <input type="text" name="generatedToken" id="generatedToken" :value="generatedToken" disabled>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SessionStart',
  props: {
  },
  data () {
    return {
      generatedToken: "",
      minGroupSize: "",
      roleName: "",
      minRoleAmount: ""
    }
  },
  methods: {
    generateToken(){      
      axios.post('http://localhost:3000/rooms', {
          "minGroupSize": this.minGroupSize,
          "roles": [
              {
                  "name": this.roleName,
                  "minAmount": this.minRoleAmount
              }
          ]
      })
      .then(function (response) {
        // this.generatedToken = response.data.token;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      alert();
    }
  }
}
</script>
