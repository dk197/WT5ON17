<template>
    <div class="content">
        <h2>Raum beitreten</h2> 
        <div v-for="(role, index) in this.$store.getters.getRoom.roles" :key="index">
          <input type="radio" v-model="selectedRole" :value="role.name"/>
          <label>{{ role.name }} </label>
        </div>
        <p></p>
        <input class="input input-p" type="text" name="name" id="name" v-model="name" placeholder="Name" />
        <p></p>
        <input class="button button-p" type="button" value="Raum beitreten" @click="joinRoom()" />
    </div>
</template>

<script>
export default {
    name: "Join",
    data() {
        return {
            name: "",
            joinToken: "",
            selectedRole: ""
        };
    },
    methods: {
        joinRoom() {
            const room = this.$store.getters.getRoom
            this.$socket.emit("joinRoom", {
                token: room.token,
                username: this.name,
                roomId: room._id,
                role: this.selectedRole,
                isAdmin: this.$store.getAdminStatus,
                isParticipant: this.$store.getParticipantStatus
            });
            this.$router.push('/waitjoin')
        }
    }
};
</script>
