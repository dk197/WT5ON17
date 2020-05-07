<template>
    <div class="content">
      <h2 class="heading">Admin-Einstellungen:</h2>
        <div id=field>
            <p>Aktuelle Phase: {{ this.$store.getters.getCurrentPhase }}</p>
        </div>
        <input
            class="button button-p"
            type="button"
            value="Nächste Phase"
            @click="nextPhase()"
        />
        <input class="button button-p" type="button" value="Speichern" @click="save()" />
        <input
            class="button button-p check"
            type="button"
            value="Raum löschen"
            @click="deleteRoom()"
        />
        <input class="button button-s" type="button" value="Zurück" @click="back()" />
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "AdminPanel",
    props: {},
    data() {
        return {
            aktuellePhase: "-"
        };
    },
    created() {
        if (!this.$store.getters.getAdminStatus) {
            this.$router.go(-1);
        }
    },
    methods: {
        save() {},
        async deleteRoom() {
            try {
                await axios.delete(
                    `http://localhost:3000/rooms/${this.$store.getters.getRoom._id}`
                );
                this.$store.commit("setRoomToken", "");
                this.$store.commit("setRoom", "");
                this.$router.push("/");
            } catch (e) {
                console.log(e);
            }
        },
        nextPhase() {
            const room = this.$store.getters.getRoom
            console.log(room._id);
            this.$socket.emit("changePhase", room._id);
            // this.$store.commit('nextPhase')
        },
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

<style>
.roleWrap {
    margin-top: 50px;
}
</style>