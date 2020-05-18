<template>
    <div id="app">
        <div id="nav">
            <div class="first-row">
                <h1 @click="home">groupify</h1>
                <div class="userCount">{{ getUserCount }}</div>
            </div>
            <div class="second-row">
                <p
                    class="room-link"
                    v-if="this.$store.getters.getRoomToken"
                >http://localhost:8080/join/{{this.$store.getters.getRoomToken}}</p>

                <div class="adminPanel">
                    <button
                        class="adminPanel-Button"
                        @click="admin"
                        v-if="this.$store.getters.getAdminStatus"
                    >Admin</button>
                </div>
            </div>
        </div>
        <ErrorPopup></ErrorPopup>
        <router-view />
    </div>
</template>

<script>
import ErrorPopup from "./components/ErrorPopup";
export default {
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers;
            return allUsers.length;
        }
    },
    methods: {
        home() {
            this.$router.push("/");
        },
        admin() {
            this.$router.push("/admin");
        }
    },
    sockets: {
        userJoinedRoom(user) {
            this.$store.commit("addUser", {
                username: user.username,
                role: user.role
            });
        },
        phaseHasChanged(data) {
            console.log(data);
            if(data.errors.length > 0) {
                console.log(data.errors);
                let errorString = ''
                data.errors.forEach(error => {
                    errorString += error + '\n'
                });
                this.$alert(errorString);
            }
            if (data.phase === "Ansichtsphase") {
                this.$router.push("/groups");
                this.$store.commit("setGroups", data.groups);
            } else if (data.phase === "Tauschphase") {
                this.$store.commit("toggleExchangeButtonStatus");
            }
            this.$store.commit("setPhase", data.phase);
        },
        exchangeWasMade(data) {
            console.log(data);
            this.$store.commit("exchangeUsers", data);
            // const groups = this.$store.getters.getGroups
            // for (let index = 0; index < groups.length; index++) {
            //     const participantIndex = groups[index].participants.findIndex(participant => participant._id === data.receiver._id)
            //     console.log(participantIndex);
            // }
        }
    },
    components: {
        ErrorPopup
    }
};
</script>

<style>
#app {
    font-family: Dubai, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    overflow: hidden;
    min-height: 100vh;
}

#nav {
    padding: 35px 40px;
    height: 150px;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    background-image: url("assets/header.svg");
    background-repeat: no-repeat;
    background-size: cover;
}

.first-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.second-row {
    padding-left: 40px;
    padding-right: 10px;
    color: #094440;
    font-weight: 600;
    font-size: 15px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.userCount {
    background-image: url("assets/icons/user.svg");
    background-repeat: no-repeat;
    padding-left: 25px;
    font-size: 15px;
    background-size: 15px 15px;
    margin-left: 30px;
}

/* Global Component-Styles */

body {
    background-image: radial-gradient(circle, #a9c0a6, #0e9986);
    background-size: 100vw 100vh;
    background-repeat: repeat-y;
}

.content {
    margin: 40px 80px 40px 70px;
    text-align: left;
    position: relative;
}

h1 {
    font-size: 40px;
    font-weight: 600;
    margin: 0;
    font-family: "Dubai";
}

h2 {
    font-size: 25px;
    font-weight: 600px;
    margin: 0;
}

.heading {
    margin: 30px 0;
}

.text-left {
    text-align: left;
}

label {
    font-size: 20px;
    font-weight: 400;
    color: #094440;
}

.button,
.input {
    font-family: "Dubai";
    border-radius: 2px;
    padding: 2px 10px;
    border: none;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    display: block;
}

.button-p {
    background-color: #094440;
    border: 2px solid #094440;
    color: white;
    width: 150px;
}

.button-s {
    background-color: transparent;
    border: 2px solid #094440;
    color: #094440;
    width: 150px;
}

.input-p {
    background-color: transparent;
    border-bottom: 2px solid #094440;
    font-weight: 400;
    width: 100%;
    color: #094440;
}

.link:hover {
    text-decoration: none !important;
    cursor: pointer;
}

::placeholder {
    color: #094440;
    font-weight: 400;
    font-size: 18px;
}

.input-p:focus {
    border-bottom: 2px solid white;
    color: white;
    outline: 0px;
}

.input-p:focus::placeholder {
    color: white;
    opacity: 0.5;
}

.input-p:focus label {
    color: white;
}

.input-s {
    background-color: transparent;
    color: white;
}

#input1:focus + #label1 {
    color: white;
}

#field {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10px;
}

#field > input:focus + label {
    color: white;
}

.link {
    color: #094440 !important;
    padding: 7px 10px;
}

.alignright {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.room-link {
    display: block;
    color: white;
}

/* Progress Bar */

.Progress {
    background-color: transparent;
    height: 450px;
    width: 25px;
    position: absolute;
    right: -45px;
    top: 0px;
}
.Progress-content {
    width: 100%;
    height: 100%;
    position: relative;
}
.Bar {
    background-color: white;
    height: 100%;
    width: 2px;
    margin-left: 14px;
}
.step {
    height: 30px;
    width: 30px;
    background-color: #094440;
    text-align: center;
    border-radius: 30px;
    color: white;
    font-size: 20px;
    font-family: "Dubai";
    font-weight: 400;
    padding-top: 5px;
    position: absolute;
    top: 0;
}
.step2 {
    top: 50%;
}
.step3 {
    top: 100%;
}
.active {
    background-color: #c5e3c1;
    color: #094440;
    font-weight: 500;
}
.done {
    background-color: #647170;
}
.adminPanel {
    text-align: right;
    margin-top: -20px;
    margin-right: -20px;
}
.adminPanel-Button {
    background-color: transparent;
    border: none;
    color: white;
    background-image: url("./assets/icons/gear.svg");
    background-repeat: no-repeat;
    padding-left: 28px;
    padding-top: 3px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
}
</style>
