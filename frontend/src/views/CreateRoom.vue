<template>
  <div class="hello">
    <h1>Groupify</h1>

    <p></p>
    <label for="minGroupSizeInput">Minimale Gruppengröße:</label>
    <input type="number" name="minGroupSizeInput" v-model="form.minGroupSize" />
    <p style="height: 10px"></p>

    <Roles
      v-for="(role, index) in form.roles"
      :key="index"
      :roleName.sync="role.name"
      :minRoleAmount.sync="role.minAmount"
      v-on:updateroleName="form.roles[index].name = $event"
      v-on:updateminRoleAmount="form.roles[index].minAmount = $event"
    ></Roles>
    <input type="button" value="Rolle hinzufügen" @click="addRole()" />

    <p style="height: 10px"></p>
    <input type="button" value="Raum erstellen" @click="generateToken()" />
    <input
      type="text"
      name="generatedToken"
      id="generatedToken"
      :value="form.generatedToken"
      disabled
    />
  </div>
</template>

<script>
import axios from "axios";
import Roles from "../components/Roles";
export default {
  name: "CreateRoom",
  props: {},
  data() {
    return {
      form: {
        generatedToken: "",
        minGroupSize: "",
        roles: [
          {
            name: "",
            minAmount: ""
          }
        ]
      }
    };
  },
  methods: {
    async generateToken() {
      try {
        const response = await axios.post(
          "http://localhost:3000/rooms",
          this.form
        );
        this.form.generatedToken = response.data.token;
      } catch (e) {
        console.log(e);
      }
    },
    addRole() {
      this.form.roles.push({name: "",minAmount: ""});
    }
  },
  components: {
    Roles
  }
};
</script>
