<script setup lang="ts">
import { ref } from 'vue'
import VarSettings from '@/components/var-settings/index.vue'
</script>

<template>
  <div class="main_app">
    <VarSettings />
  </div>
</template>

<style lang="less" scoped>
.main_app {
  width: 400px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 15px;
}
</style>
