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
  width: 375px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f1f1f1;
}
</style>
