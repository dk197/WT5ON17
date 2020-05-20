<template>
    <div>
        <p class="Groupname accordion" @click="expand">
            Gruppe {{ groupIndex + 1 }}
            <img class="arrow" src="../assets/icons/arrow.svg"/>
        </p>
        <div class="accordion-content" id="acc">
            <div
                class="Groupmember"
                v-for="(groupMember, index) in group.participants"
                :key="index"
            >
                <div>
                    <p class="member-name">{{ groupMember.username }}</p>
                    <button
                        class="member-swap input input-s"
                        @click="sendExchangeRequest(groupMember)"
                        v-if="showExchangeButton(groupMember)"
                    >
                        <img class="swap-button" src="../assets/icons/swap.svg" />
                    </button>
                </div>
                <p class="member-role">Rolle: {{ groupMember.role }}</p>
            </div>
        </div>
        <div class="Progress">
          <div class="Progress-content phase2" v-if="this.$store.getters.getCurrentPhase == 'Ansichtsphase'">
              <div class="Bar">
              </div>
              <div class="step step1 done">1
              </div>
              <div class="step step2 active">2
              </div>
              <div class="step step3">3
              </div>
          </div>
          <div class="Progress-content phase3" v-if="this.$store.getters.getCurrentPhase == 'Tauschphase'">
              <div class="Bar">
              </div>
              <div class="step step1 done">1
              </div>
              <div class="step step2 done">2
              </div>
              <div class="step step3 active">3
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ["groupIndex", "group"],
    computed: {
        getCurrentUser() {
            return this.$store.getters.getUser.username;
        }
    },
    methods: {
        showExchangeButton(groupMember) {
            const user = this.$store.getters.getUser;
            if (this.group.participants.some(participant => participant._id == user._id)) {
                return false;
            }else if(groupMember.role !== user.role) {
                return false
            }
            return this.$store.getters.getExchangeButtonStatus(groupMember._id);
        },
        sendExchangeRequest(groupMember) {
            const user = this.$store.getters.getUser;
            this.$socket.emit("sendExchange", {
                token: this.$store.getters.getRoomToken,
                groupIndex: this.groupIndex,
                sender: user,
                receiver: groupMember
            });
        },
        expand(e) {
            e.target.classList.toggle("active-acc");
            var content = document.getElementById('acc');
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    }
};
</script>

<style>
.Groupname,
.Groupmember {
    font-family: "Dubai";
    font-weight: 300;
    font-size: 20px;
    padding-left: 10px;
    margin: 10px;
}
.Groupmember {
    padding-left: 10px;
    margin-top: 0;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
}
.Groupmember > div {
    display: flex;
    justify-content: space-between;
}
.member-name {
    margin-bottom: 0;
    margin-top: 10px;
}
.member-role {
    margin: 0;
    font-size: 15px;
    color: #094440;
    font-weight: 500;
}
.member-swap {
    margin: 0 !important;
}
.accordion {
    background-color: transparent;
    color: white;
    cursor: pointer;
    padding-top: 10px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.5s;
    display: flex;
    justify-content: space-between;
    width: 200px;
}
.arrow, .accordion.active-acc > .arrow.active-acc {
    transform: rotate(-90deg);
    transition: 0.5s;
    width: 18px;
}
.arrow:active {
    background-color: transparent;
}
.accordion.active-acc > .arrow, .accordion > .arrow.active-acc {
    transform: none;
    transition: 0.5s;
}
.accordion-content {
    padding: 0 18px;
    background-color: transparent;
    color: white;
    display: none;
    overflow: hidden;
}

</style>