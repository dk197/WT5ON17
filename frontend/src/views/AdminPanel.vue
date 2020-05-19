<template>
    <div class="content">
        <h2 class="heading">Admin-Einstellungen:</h2>
        <div id="field">
            <p>Aktuelle Phase: {{ this.$store.getters.getCurrentPhase }}</p>
        </div>
        <input
            class="button button-p"
            type="button"
            value="Nächste Phase"
            @click="nextPhase()"
            v-if="isLastPhase"
        />

        <div v-if="!isLastPhase">
            <div v-for="(group, index) in this.$store.getters.getGroups" :key="index">
                <input type="checkbox" v-model="checkedGroups" :value="index" />
                <label>Gruppe {{ index }}</label>
            </div>
            <input
                class="button button-p"
                type="button"
                value="CSV Export"
                @click="exportCsv"
                :disabled="!checkedGroups.length"
            />
        </div>

        <input
            class="button button-p check"
            type="button"
            value="Raum löschen"
            @click="deleteRoom()"
        />
        <input class="button button-s" type="button" value="Zurück" @click="back()" />
        <csvExport
            ref="csvExport"
            :data="exportData"
            style="display:none"
            name="gruppen.csv"
        >Download Groups</csvExport>
    </div>
</template>

<script>
import csvExport from "vue-json-csv";
export default {
    name: "AdminPanel",
    components: { csvExport },
    data() {
        return {
            aktuellePhase: "-",
            exportData: [],
            checkedGroups: []
        };
    },
    computed: {
        isLastPhase() {
            if (this.$store.getters.getCurrentPhase !== "Tauschphase") {
                return true;
            }
            return false;
        }
    },
    created() {
        if (!this.$store.getters.getAdminStatus) {
            this.$router.go(-1);
        }
    },
    methods: {
        exportCsv() {
            var exportDataset = [];
            var groups = this.$store.getters.getGroups;
            for (let index = 0; index < groups.length; index++) {
                if (this.checkedGroups.includes(index)) {
                    const group = groups[index];
                    var myGroup = ["GRUPPE " + index];
                    for (
                        let index = 0;
                        index < group.participants.length;
                        index++
                    ) {
                        const participant = group.participants[index];
                        myGroup.push(
                            participant.username + " (" + participant.role + ")"
                        );
                    }
                    exportDataset.push(myGroup);
                }
            }
            this.exportData = exportDataset;
            setTimeout(() => this.$refs.csvExport.$el.click(), 1000);
        },
        async deleteRoom() {
            this.$socket.emit("deleteRoom", {
                roomId: this.$store.getters.getRoom._id,
                token: this.$store.getters.getRoomToken
            });
        },
        nextPhase() {
            const room = this.$store.getters.getRoom;
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