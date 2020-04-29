<template>
  <div class="content">
    <h2 class="heading">Gruppen-Einstellungen:</h2>
    <field id=field>
      <input class="input-p" placeholder="Gruppengröße" type="number" name="minGroupSizeInput" v-model="form.minGroupSize"/>
      <label for="minGroupSizeInput">Minimale Gruppengröße:</label>
    </field>
    <div class="roleWrap">
      <Roles
        v-for="(role, index) in form.roles"
        :key="index"
        :roleName.sync="role.name"
        :minRoleAmount.sync="role.minAmount"
        v-on:updateroleName="form.roles[index].name = $event"
        v-on:updateminRoleAmount="form.roles[index].minAmount = $event"
        @remove="removeRole(index)"
      ></Roles>
      <input class="button button-s plus" type="button" value="Rolle hinzufügen" @click="addRole()" />
    </div>

    <input class="button button-p check" type="button" value="Raum erstellen" @click="generateToken()"/>
    <input
      class="input-s"
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
        roles: []
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
        this.$store.commit('setRoomToken', response.data.token)
        this.$store.commit('setRoom', response.data)
      } catch (e) {
        console.log(e);
      }
    },
    addRole() {
      this.form.roles.push({name: "",minAmount: ""});
    },
    removeRole(index){
      this.form.roles.splice(index, 1);
    }
  },
  components: {
    Roles
  },
  sockets: {
        connect() {
            console.log('connected');
        }
    }
};

</script>

<style>
  .roleWrap {
    margin-top: 50px;
  }
</style>