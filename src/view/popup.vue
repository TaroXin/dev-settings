<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Popup Test')
</script>

<template>
  <div class="main_app">
    <h1>Hello {{ msg }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.main_app {
  width: 400px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
