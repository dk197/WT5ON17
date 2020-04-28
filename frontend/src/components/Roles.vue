<template>
  <div>
    <label for="roleNameInput">Name der Rolle:</label>
    <input type="text" name="roleNameInput" data-inputname="roleName" :value="roleName" @keyup="updateInput"/>
    <p></p>
    <label for="minRoleAmountInput">Minimale Anzahl der Rolle:</label>
    <input type="number" name="minRoleAmountInput" data-inputname="minRoleAmount" :value="minRoleAmount" @keyup="updateInput"/>
    <input type="button" value="-" @click="buttonRemove()">
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
