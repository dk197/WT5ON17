<template>
    <div>
        <p class="Groupname">Gruppe {{ index }}</p>
        <div>
            <p class="Groupmember" v-for="(groupMember, index) in group.participants" :key="index">{{ groupMember.username }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index', 'group']
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