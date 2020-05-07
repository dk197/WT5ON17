<template>
    <div>
        <p>Gruppe {{ index }}</p>
        <div>
            <p v-for="(groupMember, index) in group.participants" :key="index">{{ groupMember.username }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index', 'group']
}
</script>