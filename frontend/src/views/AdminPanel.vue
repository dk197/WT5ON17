<template>
    <div class="content">
        <input class="input input-s back-button" type="button" value="" @click="back()" />
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

        <div v-if="!isLastPhase" class="checkbox-wrap">
            <div v-for="(group, index) in this.$store.getters.getGroups" :key="index">
                <input type="checkbox" class="input-checkbox" v-model="checkedGroups" :value="index" />
                <label>Gruppe {{ index + 1 }}</label>
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
            if (this.$store.getters.getCurrentPhase !== "Exportphase") {
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
                    var myGroup = ["GRUPPE " + (index + 1)];
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
            this.$socket.emit("changePhase", room._id);
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
.checkbox-wrap {
    margin: 20px 0 10px 0;
}
.checkbox-wrap > div {
    margin-bottom: 5px;
}
.input-checkbox {
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
    border: 4px solid #094440;
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
}
.input-checkbox:checked {
    background-color: white;
}
.input-checkbox:focus {
    box-shadow: 0 0 0 var(--focus);
}
.back-button {
    background-image: url('../assets/icons/arrow-left.svg');
    background-repeat: no-repeat;
    background-color: transparent;
    width: 30px;
    position: absolute;
    left: -50px
}
</style>