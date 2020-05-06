<template>
  <div>
    <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    <!-- <input type="range" v-model.number="amount"> {{ amount }}% -->
  </div>
</template>

<script>
  export default {
    name: 'ProgressBarDeterminate',
    data: () => ({
      amount: 0
    })
  }
</script>

<style>
  .md-progress-bar.md-theme-default.md-determinate {
    background-color: #42b983 !important;
  }
  .md-progress-bar.md-theme-default.md-determinate .md-progress-bar-fill {
    background-color: white !important;
  }
</style>