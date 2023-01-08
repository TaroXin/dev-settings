<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Popup Test1')

function setStorage() {
  chrome.storage.local.set({
    'test-value': 'This is test message',
  })
}

async function getStorage() {
  const res = await chrome.storage.local.get('test-value')
  console.log(res)
}
</script>

<template>
  <div class="main_app">
    <h1>Hello {{ msg }}</h1>

    <a-button type="primary" @click="setStorage">
      设置一个变量
    </a-button>
    <a-button type="primary" @click="getStorage">
      获取变量
    </a-button>
  </div>
</template>

<style lang="less" scoped>
.main_app {
  width: 400px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
