<template>
  <div class="content">
    <h2 style="line-height:1.2" class="heading">Gruppen-Einstellungen:</h2>
    <div id=field>
      <input class="input input-p" placeholder="Gruppenanzahl" type="number" name="groupAmount" v-model="form.groupAmount"/>
      <label for="groupAmount">Anzahl an generierten Gruppen:</label>
    </div>
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
      <div class="alignright">
      <input class="button button-s" type="button" value="Rolle hinzufügen" @click="addRole()" />
      </div>
    </div>

    <div class="alignright">
    <input class="button button-p" type="button" value="Raum erstellen" @click="generateToken()"/>
    <input
      class="input input-s"
      type="text"
      name="generatedToken"
      id="generatedToken"
      :value="form.generatedToken"
      disabled
    />
    </div>
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
        groupAmount: "",
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
        console.log(response);
        this.form.generatedToken = response.data.roomToken;
        this.$store.commit('setRoomToken', response.data.roomToken)
        this.$store.commit('setRoom', response.data.createdRoom)
        this.$store.commit('setAdmin')
        localStorage.setItem('authToken', response.data.createdRoomOwner.authToken)
        this.$store.commit('addUser', response.data.createdRoomOwner)
        this.$socket.emit("createRoom", response.data.roomToken);
        this.$router.push({ path: `/room` })
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