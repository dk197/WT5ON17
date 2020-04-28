<template>
  <div class="home">
    <SessionStart/>
  </div>
</template>

<script>
// @ is an alias to /src
import SessionStart from '@/components/SessionStart.vue'

export default {
  name: 'Home',
  components: {
    SessionStart
  }
}
</script>
