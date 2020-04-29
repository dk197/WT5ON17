<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <span>Active Users: {{getUserCount}}</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers
            return allUsers.length
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
