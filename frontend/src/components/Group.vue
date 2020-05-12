<template>
    <div>
        <p class="Groupname accordion">Gruppe {{ index }}<img class="arrow" src="../assets/icons/arrow.svg"></p>
        <div class="accordion-content">
            <p class="Groupmember" v-for="(groupMember, index) in group.participants" :key="index">{{ groupMember.username }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index', 'group'],
    mounted() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
        });
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
    padding-left: 20px;
    margin-top: 0;
}
.accordion {
    background-color: transparent;
    color: white;
    cursor: pointer;
    padding-top: 10px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.5s;
    display: flex;
    justify-content: space-between;
}
.arrow {
    transform: rotate(-90deg);
    transition: 0.5s;
    width: 20px;
}
.accordion.active > img {
    transform: none;
    transition: 0.5s;
}
.accordion-content {
    padding: 0 18px;
    background-color: transparent;
    color: white;
    display: none;
    overflow: hidden;
}

</style>