<template>
  <div class="content">
      <h2>Bereits beigetreten: {{ getUserCount }}</h2>
      <ul>
        <div v-for="(user, index) in this.$store.getters.getAllUsers" :key="index">
          <li><b> Name:</b> {{user.username}} <b>Role:</b> {{user.role}}</li>
        </div>
      </ul>
      
  </div>
</template>

<script>
export default {
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers
            return allUsers.length
        }
    }
}
</script>