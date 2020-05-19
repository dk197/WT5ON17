<template>
  <div class="content">
    <div class="waitingScreen">
      <h2> Warte auf die anderen Teilnehmer</h2>
      <img src="../assets/icons/hourglass.svg">
      <h2 class="userCountWait">{{ getUserCount }}</h2>
      <ul>
        <div v-for="(user, index) in this.$store.getters.getAllUsers" :key="index">
          <li><b> Name:</b> {{user.username}} <b>Role:</b> {{user.role}}</li>
        </div>
      </ul>
    </div>
     <div class="Progress">
          <div class="Progress-content">
              <div class="Bar">
              </div>
              <div class="step step1 active">1
              </div>
              <div class="step step2">2
              </div>
              <div class="step step3">3
              </div>
          </div>
      </div>
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
    created() {
        if(this.$store.getters.getCurrentPhase !== 'Beitrittsphase') {
            this.$router.go(-1)
        }
    }
}
</script>

<style>
  .waitingScreen {
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 100px;
  }
  .waitingScreen > img {
    margin: 10px 0;
  }
  .waitingScreen > h2 {
    line-height: 1.2;
  }
  .userCountWait {
    text-align: center;
    font-size: 40px;
    width: 100px;
    background-image: url('../assets/icons/user.svg');
    background-repeat: no-repeat;
    background-size: 30px auto;
    background-position: 0px 6px;
    margin-left:37.5%;
  }
  .waitingScreen > ul {
    padding-left: 20px;
  }
  .waitingScreen > ul > div > li {
    list-style: none;
  }
</style>