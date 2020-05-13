<template>
    <div>
        <p class="Groupname">Gruppe {{ groupIndex }}</p>
        <p>{{ getCurrentUser }}</p>
        <div>
            <div class="Groupmember" v-for="(groupMember, index) in group.participants" :key="index">
                {{ groupMember.username }} als {{ groupMember.role }}
                <button @click="sendExchangeRequest(groupMember)" v-if="showExchangeButton(groupMember)">Tauschanfrage senden</button>
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
            return this.$store.getters.getExchangeButtonStatus(groupMember._id)
        },
        sendExchangeRequest(groupMember) {
            const user = this.$store.getters.getUser
            this.$socket.emit("sendExchange", {
                token: this.$store.getters.getRoomToken,
                groupIndex: this.groupIndex,
                sender: user,                
                receiver: groupMember
            });
        }
    }
}
</script>

<style>
    .Groupname, .Groupmember {
        font-family: 'Dubai';
        font-weight: 300;
        font-size: 20px;
        padding-left: 20px;
    }
    .Groupmember {
        padding-left: 40px;
    }
</style>