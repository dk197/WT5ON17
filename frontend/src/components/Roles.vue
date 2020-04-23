<template>
  <div>
    <label for="roleNameInput">Name der Rolle:</label>
    <input type="text" name="roleNameInput" data-inputname="roleName" :value="roleName" @keyup="updateInput"/>
    <p></p>
    <label for="minRoleAmountInput">Minimale Anzahl der Rolle:</label>
    <input type="number" name="minRoleAmountInput" data-inputname="minRoleAmount" :value="minRoleAmount" @keyup="updateInput"/>
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
      }
  }
}
</script>
