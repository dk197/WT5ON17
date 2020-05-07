<template>
  <div class="content">
    <div class="waitingScreen">
      <h2> Warte auf die anderen Teilnehmer</h2>
      <img src="../assets/icons/hourglass.svg">
      <h2 class="userCountWait">{{ getUserCount }}/</h2>
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
  }
  .waitingScreen > ul {
    padding-left: 20px;
  }
  .waitingScreen > ul > div > li {
    list-style: none;
  }
</style>