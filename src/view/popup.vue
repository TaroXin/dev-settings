<script setup lang="ts">
import { ref } from 'vue'

function setSettingConfig() {
  chrome.storage.local.set({
    settingConfig: {
      isDebugger: false,
      namedValue: 'test string',
    },
  })
}

async function getStorage() {
  const res = await chrome.storage.local.get('test-value')
  console.log(res)
}
</script>

<template>
  <div class="main_app">
    <a-list bordered>
      <a-list-item>
        <div class="mobile-style">
          <span>Debugger Mode</span>
          <a-switch />
        </div>
      </a-list-item>

      <a-list-item>
        <div class="mobile-style">
          <span>高拍仪IP</span>
          <a-input placeholder="ipv4 类型" maxlength="15" />
        </div>
      </a-list-item>

      <template #header>
        <div class="list-header">
          变量设置
        </div>
      </template>
    </a-list>

    <a-button type="primary" @click="setSettingConfig">
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
  padding: 15px;
}

.list-header {
  font-weight: bold;
  text-align: left;
}

.mobile-style {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .ant-input {
    width: 200px;
    text-align: right;
  }
}
</style>
