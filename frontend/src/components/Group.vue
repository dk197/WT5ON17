<template>
    <div>
        <p class="Groupname accordion" @click="expand">Gruppe {{ groupIndex }}<img class="arrow" src="../assets/icons/arrow.svg"></p>
        <div class="accordion-content">
            <div class="Groupmember" v-for="(groupMember, index) in group.participants" :key="index">
                <div>
                    <p class="member-name">{{ groupMember.username }}</p>
                    <button class="member-swap input input-s" @click="sendExchangeRequest(groupMember)" v-if="showExchangeButton(groupMember)"><img class="swap-button" src="../assets/icons/swap.svg"></button>
                </div>
                <p class="member-role">Rolle: {{ groupMember.role }}</p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['groupIndex', 'group'],
    computed: {
        getCurrentUser() {
            return this.$store.getters.getUser.username
        }
    },
    methods: {
        showExchangeButton(groupMember) {
            const user = this.$store.getters.getUser
            if(this.group.participants.some(participant => participant._id == user._id)) {
                return false
            }
            return this.$store.getters.getExchangeButtonStatus(groupMember._id)
        },
        sendExchangeRequest(groupMember) {
            const user = this.$store.getters.getUser
            this.$socket.emit("sendExchange", {
                token: this.$store.getters.getRoomToken,
                groupIndex: this.groupIndex,
                sender: user,                
                receiver: groupMember
            })
        },
         expand(e){
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    }
}
</script>

<style>
.Groupname, .Groupmember {
    font-family: 'Dubai';
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
.member-swap  {
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
.arrow {
    transform: rotate(-90deg);
    transition: 0.5s;
    width: 18px;
}
.accordion.active > img {
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