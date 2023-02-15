<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { DEV_SETTING_VAR_ID, STORAGE_EVENT_OPTIONS_KEY } from '@/enum/keys'
import type { SettingEventOption } from '@/impl/event'
import { setOptionValue } from '@/util/option'

const systemList = ref<SettingEventOption[]>([
  {
    id: DEV_SETTING_VAR_ID,
    label: '调试模式',
    name: 'isDebug',
    initialValue: false,
    component: 'switch',
    value: false,
  },
])
const componentList = ref<SettingEventOption[]>([])

// 根据当前的URL，加载目前所有的组件列表
async function getCurrentSettings() {
  const values = await chrome.storage.local.get(STORAGE_EVENT_OPTIONS_KEY)

  const optionList: SettingEventOption[] = values[STORAGE_EVENT_OPTIONS_KEY] || []
  chrome.windows.getCurrent((currentWindow) => {
    chrome.tabs.query({ active: true, windowId: currentWindow.id }, (tabs) => {
      const currentTab = tabs[0]
      console.log(optionList, currentTab.url)
      if (currentTab.url) {
        const url = new URL(currentTab.url)
        componentList.value = optionList.filter(o => o.id == url.hostname)

        // 系统变量查询
        const result = optionList.filter(o => o.id == DEV_SETTING_VAR_ID)
        console.log('系统变量', result)
        result.forEach((r) => {
          const exist = systemList.value.find(s => s.name == r.name)
          exist && (exist.value = r.value)
        })
      }
    })
  })
}

getCurrentSettings()

function saveConfig() {
  setOptionValue(...systemList.value, ...componentList.value)
  showToast({
    message: '保存成功',
    icon: 'success',
  })
}
</script>

<template>
  <div class="var-settings-container">
    <van-cell-group v-if="systemList.length" title="系统变量">
      <template v-for="(comp, index) in systemList" :key="index">
        <van-field
          v-if="!comp.component || comp.component == 'text'"
          v-model="comp.value"
          :label="comp.label"
          :placeholder="`请输入${comp.label}`"
          input-align="right"
          maxlength="100"
        />

        <van-cell v-if="comp.component == 'switch'" :title="comp.label">
          <template #right-icon>
            <van-switch v-model="comp.value" />
          </template>
        </van-cell>
      </template>
    </van-cell-group>

    <van-cell-group v-if="componentList.length" title="页面变量">
      <template v-for="(comp, index) in componentList" :key="index">
        <van-field
          v-if="!comp.component || comp.component == 'text'"
          v-model="comp.value"
          :label="comp.label"
          :placeholder="`请输入${comp.label}`"
          input-align="right"
          maxlength="100"
        />

        <van-cell v-if="comp.component == 'switch'" :title="comp.label">
          <template #right-icon>
            <van-switch v-model="comp.value" />
          </template>
        </van-cell>
      </template>
    </van-cell-group>

    <div class="action-wrap">
      <van-space>
        <van-button type="primary" size="small" @click="saveConfig">
          保存设置
        </van-button>
      </van-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
.action-wrap {
  text-align: center;
  padding: 10px;
}
</style>
