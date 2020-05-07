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
import axios from "axios";
export default {
    name: "Join",
    data() {
        return {
            name: "",
            joinToken: "",
            selectedRole: ""
        };
    },
    mounted: async function(){
        try {   
                const response = await axios.get(
                     `http://localhost:3000/rooms/${this.$route.fullPath.split('/').pop()}`
                );
                console.log(response);
                this.$store.commit("setRoomToken", response.data.room.token);
                this.$store.commit("setRoom", response.data.room);
                this.$store.commit("setParticipant");
                response.data.users.forEach(user => {
                    this.$store.commit("addUser", {
                        username: user.username,
                        role: user.role
                    });
                });
            } catch (e) {
                console.log(e);
            }
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
