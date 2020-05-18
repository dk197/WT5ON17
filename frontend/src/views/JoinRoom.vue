<template>
    <div class="content">
        <h2 style="padding-top: 150px;">Raum beitreten</h2> 
        <input class="input input-p" autocomplete="off" style="margin-top:20px" type="text" name="name" id="name" v-model="name" placeholder="Name" />
        <div class="selectable-role" v-for="(role, index) in this.$store.getters.getRoom.roles" :key="index">
          <input class="input-radio" type="radio" v-model="selectedRole" :value="role.name"/>
          <label>{{ role.name }} </label>
        </div>
        <input class="button button-p join" type="button" value="Raum beitreten" @click="joinRoom()" />
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
                     `https://wt5on17.herokuapp.com/rooms/${this.$route.fullPath.split('/').pop()}`
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
        async joinRoom() {

            if(this.name.length < 4) {
                this.$store.commit('toggleErrorPopup')
                this.$store.commit('setErrors', ['Der Nutzername muss mindestens 4 Zeichen lang sein'])
                return
            }

            const room = this.$store.getters.getRoom
            try {
                const response = await axios.post('https://wt5on17.herokuapp.com/user', {
                    username: this.name,
                    roomId: room._id,
                    role: this.selectedRole,
                    isAdmin: this.$store.getAdminStatus,
                    isParticipant: this.$store.getParticipantStatus
                })
                const user = response.data

                this.$store.commit('setUser', user)
                this.$socket.emit("joinRoom", {
                    token: room.token,
                    user: {
                        username: user.username,
                        isAdmin: user.isAdmin,
                        isParticipant: user.isParticipant,
                        role: user.role,
                        _id: user._id
                    }
                });
                this.$router.push('/waitjoin')
            }catch(e) {
                console.log(e);
            }
            
        }
    }
};
</script>

<style>
.selectable-role {
    margin: 10px 5px 0px 0;
}
.input-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 20px;
    border: 4px solid #094440;
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
  }
.input-radio:checked {
    background-color: white;
}
.input-radio:focus {
    box-shadow: 0 0 0 var(--focus);
}
.join {
    margin-top: 20px;
} 
</style>
