<template>
    <div class="content">
        <h2 style="line-height:1.2" class="heading">Gruppen-Einstellungen:</h2>
        <div id="field">
            <input
                class="input input-p"
                placeholder="Gruppenanzahl"
                type="number"
                name="groupAmount"
                v-model="roomForm.groupAmount"
            />
            <label for="groupAmount">Anzahl an generierten Gruppen:</label>
        </div>
        <div class="roleWrap">
            <Roles
                v-for="(role, index) in roomForm.roles"
                :key="index"
                :roleName.sync="role.name"
                :minRoleAmount.sync="role.minAmount"
                v-on:updateroleName="roomForm.roles[index].name = $event"
                v-on:updateminRoleAmount="roomForm.roles[index].minAmount = $event"
                @remove="removeRole(index)"
            ></Roles>
            <div class="alignright">
                <input
                    class="button button-s"
                    type="button"
                    value="Rolle hinzufügen"
                    @click="addRole()"
                />
            </div>
        </div>

        <div v-if="showParticipantForm">
            <div>
                <input
                    class="input input-p"
                    type="text"
                    v-model="userForm.username"
                    placeholder="Name"
                />
            </div>
            <div class="selectable-role" v-for="(role, index) in roomForm.roles" :key="index">
                <input class="input-radio" type="radio" v-model="userForm.role" :value="role.name" />
                <label>{{ role.name }}</label>
            </div>
        </div>

        <div class="alignright">
            <input
                class="button button-s"
                type="button"
                value="Selbst teilnehmen"
                @click="toggleParticipantForm()"
            />
        </div>

        <div class="alignright">
            <input
                class="button button-p"
                type="button"
                value="Raum erstellen"
                @click="generateToken()"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Roles from "../components/Roles";
export default {
    name: "CreateRoom",
    props: {},
    data() {
        return {
            roomForm: {
                generatedToken: "",
                groupAmount: "",
                roles: []
            },
            userForm: {
                role: "",
                username: ""
            },
            showParticipantForm: false
        };
    },
    methods: {
        async generateToken() {
            if(this.userForm.username.length < 4) {
                this.$store.commit('toggleErrorPopup')
                this.$store.commit('setErrors', ['Der Nutzername muss mindestens 4 Zeichen lang sein'])
                return
            }
            try {
                const response = await axios.post(
                    "http://localhost:3000/rooms",
                    {
                        room: this.roomForm,
                        user: this.userForm
                    }
                );
                console.log(response);
                this.roomForm.generatedToken = response.data.roomToken;
                this.$store.commit("setRoomToken", response.data.roomToken);
                this.$store.commit("setRoom", response.data.createdRoom);
                this.$store.commit("setAdmin");
                localStorage.setItem(
                    "authToken",
                    response.data.createdRoomOwner.authToken
                );
                this.$store.commit("addUser", response.data.createdRoomOwner);
                this.$store.commit("setUser", response.data.createdRoomOwner);
                this.$socket.emit("createRoom", response.data.roomToken);
                this.$router.push({ path: `/room` });
            } catch (e) {
                console.log(e);
            }
        },
        addRole() {
            this.roomForm.roles.push({ name: "", minAmount: "" });
        },
        removeRole(index) {
            this.roomForm.roles.splice(index, 1);
        },
        toggleParticipantForm() {
            this.showParticipantForm = !this.showParticipantForm;
        }
    },
    components: {
        Roles
    },
    sockets: {
        connect() {
            console.log("connected");
        }
    }
};
</script>

<style>
.roleWrap {
    margin-top: 50px;
}
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
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
}
.input-radio:checked {
    background-color: white;
}
.input-radio:focus {
    box-shadow: 0 0 0 var(--focus);
}
</style>