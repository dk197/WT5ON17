<template>
    <div class="hello">
        <h1>Groupify</h1>
        <h2>Join Room</h2> 
        <div v-for="(role, index) in this.$store.getters.getRoom.roles" :key="index">
          <input type="radio" v-model="selectedRole" :value="role.name"/>
          <label>{{ role.name }} </label>
        </div>
        <p></p>
        <input type="text" name="name" id="name" v-model="name" placeholder="Name" />
        <p></p>
        <input type="button" value="Raum beitreten" @click="joinRoom()" />
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
            console.log(this.selectedRole);
            const room = this.$store.getters.getRoom
            this.$socket.emit("joinRoom", {
                token: room.token,
                username: this.name,
                roomId: room._id,
                role: this.selectedRole,
                isAdmin: this.$store.getAdminStatus,
                isParticipant: this.$store.getParticipantStatus
            });
        }
    },
    sockets: {
        testEvent(data) {
            console.log('test',data);
        }
    }
};
</script>
