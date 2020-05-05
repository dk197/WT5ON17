<template>
  <div>
    <div id=field>
      <input class="input-p" placeholder="Rollenname" type="text" name="roleNameInput" data-inputname="roleName" :value="roleName" @keyup="updateInput"/>
      <label for="roleNameInput">Name der Rolle:</label>
    </div>
    <div id=field>
      <input class="delete-role" type="button" value="" @click="buttonRemove()">
      <input class="input-p" placeholder="Anzahl" type="number" name="minRoleAmountInput" data-inputname="minRoleAmount" :value="minRoleAmount" @keyup="updateInput"/>
      <label for="minRoleAmountInput">Minimale Anzahl der Rolle:</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  props: [
      "roleName",
      "minRoleAmount"
  ],
  methods: {
      updateInput(e) {
          const value = e.target.value
          const name= e.target.dataset.inputname
          this.$emit(`update${name}`, value)
      },
      buttonRemove(){
        this.$emit('remove')
      }
  }
}
</script>

<style>
.delete-role {
  background-image: url('../assets/icons/trash.svg');
  background-repeat: no-repeat;
  margin-top: 10px;
  margin-left: 90%;
  background-color: transparent;
}
</style>
