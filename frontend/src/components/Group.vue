<template>
    <div>
        <p class="Groupname">Gruppe {{ index }}</p>
        <div>
            <div class="Groupmember" v-for="(groupMember, index) in group.participants" :key="index">
                {{ groupMember.username }}
                <button @click="sendExchangeRequest(groupMember)" v-if="showExchangeButton">Tauschanfrage senden</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index', 'group'],
    computed: {
        showExchangeButton() {
            return this.$store.getters.getExchangeButtonStatus
        }
    },
    methods: {
        sendExchangeRequest(groupMember) {
            console.log(groupMember);
        }
    }
}
</script>

<style>
    .Groupname, .Groupmember {
        font-family: 'Dubai';
        font-weight: 300;
        font-size: 20px;
        padding-left: 20px;
    }
    .Groupmember {
        padding-left: 40px;
    }
</style>