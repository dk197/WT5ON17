<template>
  <div id="app">
    <div id="nav">
      <h1 @click="home">groupify</h1>
      <div class="userCount"> {{ getUserCount }}</div>
      <p
                v-if="this.$store.getters.getRoomToken"
            >http://localhost:8080/join/{{this.$store.getters.getRoomToken}}</p>
        <ProgressBar></ProgressBar>
        <router-view />
    </div>
  </div>
</template>

<script>
import Progress from "./components/Progress";
export default {
    components: {
        ProgressBar: Progress
    },
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers;
            return allUsers.length;
        }
    },
    methods: {
        home() {
            this.$router.push("/");
        }
    },
    sockets: {
        userJoinedRoom(user) {
            console.log(user);
            this.$store.commit("addUser", {
                username: user.username,
                role: user.role
            });
        },
        phaseHasChanged(phase) {
            if(phase === 'Ansichtsphase') {
                // router.push('/waitjoin')
            }
        }
    }
};
</script>

<style>
#app {
    font-family: Dubai, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}

#nav {
  padding: 35px 40px;
  height: 150px;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  background-image: url('assets/header.svg');
  background-repeat: no-repeat;
  background-size: cover
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.userCount {
  background-image: url('assets/icons/user.svg');
  background-repeat: no-repeat;
  padding-left: 25px;
  font-size: 15px;
  background-size: 15px 15px;
  margin-left: 30px;
}

/* Global Component-Styles */

body {
    background-image: radial-gradient(circle, #a9c0a6, #097770);
}

.content {
  margin: 40px 80px 40px 40px;
  text-align: left;
}

h1 {
  font-size: 40px;
  font-weight: 600;
  margin: 0;
  font-family: 'Dubai';
}

h2 {
    font-size: 25px;
    font-weight: 600px;
    margin: 0;
}

.heading {
    margin: 30px 0;
}

.text-left {
  text-align: left;
}

label {
    font-size: 20px;
    font-weight: 400;
    color: #094440;
}

.button, .input{
  font-family: 'Dubai';
  border-radius: 2px;
  padding: 2px 10px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  display: block;
}

.button-p{
  background-color: #094440;
  border: 2px solid #094440;
  color: white;
  width: max-content;
  
}

.button-s {
  background-color: transparent;
  border: 2px solid #094440;
  color: #094440;
  width: max-content;
}

.input-p{
  background-color: transparent;
  border-bottom: 2px solid #094440;
  font-weight: 400;
  width: 100%;
}

.link:hover {
    text-decoration: none !important;
    cursor: pointer;
}

::placeholder {
    color: #094440;
    font-weight: 300;
    font-size: 18px;
}

.input-p:focus {
    border-bottom: 2px solid white;
    color: white;
    outline: 0px;
}

.input-p:focus::placeholder {
    color: white;
    opacity: 0.5;
}

.input-p:focus label {
    color: white;
}

.input-s {
    background-color: transparent;
    color: white;
}

#input1:focus + #label1 {
    color: white;
}

#field {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10px;
}

#field > input:focus + label {
    color: white;
}

.link {
  color:#094440 !important;
  padding: 7px 10px;
}

.alignright {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
