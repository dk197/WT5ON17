<template>
  <div id="app">
    <div id="nav">
      <h1 @click="home">groupify</h1>
      <p>(Nutzeranzahl: {{ getUserCount }})</p>
      <p v-if="this.$store.getters.getRoomToken">http://localhost:8080/join/{{this.$store.getters.getRoomToken}}</p>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <ProgressBar></ProgressBar>
    <router-view/>
  </div>
</template>

<script>
import Progress from './components/Progress'
export default {
  components: {
		ProgressBar: Progress,
	},
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers
            return allUsers.length
        }
    },
    methods: {
      home() {
        this.$router.push('/')
      }
    },
    sockets: {
        userJoinedRoom(user) {
            console.log(user);
            this.$store.commit('addUser', {
                username: user.username,
                role: user.role
            })
        }
    }
}
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
  padding: 20px 40px;
  display: flex;
  text-align: left;
  background-color: #094440
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Global Component-Styles */

body {
  background-image: radial-gradient(circle, #A9C0A6,#097770);
}

.content {
  margin: 40px;
  text-align: left;
}

h1 {
  font-size: 30px;
  font-weight: 600;
  margin: 0;
}

h2 {
  font-size: 25px;
  font-weight: 600px;
  margin: 0;
}

.heading {
  margin: 30px 0;
}

label {
  font-size: 20px;
  font-weight: 400;
  color: #094440;
}

.button, input{
  font-family: 'Dubai';
  border-radius: 2px;
  padding: 10px 15px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
}

.button-p{
  background-color: #094440;
  border: 2px solid #094440;
  color: white;
  width: 180px;
  
}

.button-s {
  background-color: transparent;
  border: 2px solid #094440;
  color: #094440;
  width: 180px;
}

.input-p{
  background-color: transparent;
  border-bottom: 2px solid #094440;
  font-weight: 400;
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

#field>input:focus + label {
  color: white;
}

.link {
  color: white !important;
}

</style>
