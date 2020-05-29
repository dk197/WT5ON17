<template>
    <div id="app">
        <div id="nav">
            <div class="first-row">
                <h1>groupify</h1>
                <div style="width:20px"></div>
                <div class="adminPanel">
                <button
                        class="adminPanel-Button"
                        @click="admin"
                        v-if="this.$store.getters.getAdminStatus"
                    >Admin</button>
                </div>
                <div class="userCount">{{ getUserCount }}</div>
            </div>
           
            <div class="second-row">
                <input type="hidden" id="copyLink" :value="'http://localhost:8080/join/'+ this.$store.getters.getRoomToken">
                <p
                    class="room-link"
                    v-if="this.$store.getters.getRoomToken"
                >Token: {{this.$store.getters.getRoomToken}}</p>
                <input
                    class="input input-s check copy"
                    type="button"
                    value="Link"
                    @click.stop.prevent="copyLink"
                    v-if="this.$store.getters.getRoomToken"
                />
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        window.addEventListener('beforeunload', this.confirm_leaving)
        window.addEventListener('unload', this.leaving)
    },    
    computed: {
        getUserCount() {
            const allUsers = this.$store.getters.getAllUsers;
            return allUsers.length;
        }
    },
    methods: {
        copyLink() {
            let copyLink = document.querySelector('#copyLink')
            copyLink.setAttribute('type', 'text')
            copyLink.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'erfolgreich' : 'nicht erfolgreich';
                alert('Der Link zum Teilen wurde ' + msg + 'in die Zwischenablage kopiert!');
            } catch (err) {
                alert('Oops, etwas lief schief!');
            }

            copyLink.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        admin() {
            this.$router.push("/admin");
        },
        async confirm_leaving (evt) {
            if (this.$store.getters.getAdminStatus) {
                evt.returnValue = ""
                return ""
            }
            
        },
        leaving (evt) {
            if (this.$store.getters.getAdminStatus) {
                evt.returnValue = ""
                this.$socket.emit("deleteRoom", {
                    roomId: this.$store.getters.getRoom._id,
                    token: this.$store.getters.getRoomToken
                })
                this.$router.push({ path: `/` });
            }
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
            if(data.errors.length > 0 && this.$store.getters.getAdminStatus) {
                let errorString = ''
                data.errors.forEach(error => {
                    errorString += error + ' '
                });
                this.$alert(errorString);
            }
            if (data.phase === "Ansichtsphase") {
                this.$router.push("/groups");
                this.$store.commit("setGroups", data.groups);
            } else if (data.phase === "Tauschphase") {
                this.$store.commit("toggleExchangeButtonStatus");
            } else if (data.phase === "Exportphase") {
                this.$router.push("/mygroup");
                this.$store.commit("toggleExchangeButtonStatus");
            }
            this.$store.commit("setPhase", data.phase);
        },
        exchangeWasMade(data) {
            this.$store.commit("exchangeUsers", data);
            this.$store.commit('removeExchangingUser', data.sender._id)
            this.$store.commit('removeExchangingUser', data.receiver._id)
        },
        exchangeWasNotMade(data) {
            this.$store.commit('removeExchangingUser', data.sender._id)
            this.$store.commit('removeExchangingUser', data.receiver._id)
        },
        roomWasClosed() {
            this.$alert('Der Raum wurde vom Admin geschlossen')
            this.$router.push('/')
        }
    }
};
</script>

<style>
@import "./assets/fonts/fonts.css";

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
    padding-top: 12px;
    color: #094440;
    font-weight: 600;
    font-size: 15px;
    position: relative;
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
    line-height: 1.1;
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
    width: 200px;
}

/* Progress Bar */

.Progress {
    background-color: transparent;
    height: 400px;
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

/* Admin Popup */
.swal2-popup {
    border-radius: 2px !important;
}
.swal2-content {
    font-family: 'Dubai';
}
.swal2-confirm {
    font-family: "Dubai" !important;
    border-radius: 2px !important;
    padding: 2px 10px !important;
    font-size: 18px !important;
    font-weight: 400 !important;
    margin-bottom: 10px !important;
    display: block !important;
    background-color: #094440 !important;
    border: 2px solid #094440 !important;
    color: white !important;
    width: 150px !important;
}

/* Copy Link */

.copy {
    background-image: url('./assets/icons/copy.svg');
    background-repeat: no-repeat;
    background-size: 18px auto;
    background-position: 0px 2px;
    margin-top: 10px;
    margin-left: 90%;
    background-color: transparent;
    padding-left: 23px;
    position: absolute;
    top: 12px;
    right: -15px;
}
</style>
