import { DEV_SETTING_VAR_ID, STORAGE_EVENT_OPTIONS_KEY } from '@/enum/keys'
import type { SettingEvent, SettingEventOption } from '@/impl/event'
import { setOption } from '@/util/option'

async function injectSettings() {
  const values = await chrome.storage.local.get(STORAGE_EVENT_OPTIONS_KEY)
  const optionList: SettingEventOption[] = values[STORAGE_EVENT_OPTIONS_KEY] || []
  const injectList = optionList.filter(o => o.id == window.location.hostname || o.id == DEV_SETTING_VAR_ID)
  localStorage.setItem('@dev-settings-vars', JSON.stringify(injectList))
  console.log('Vars loaded')
}

console.log('DevSettings content script loaded')
injectSettings()
window.addEventListener('message', (e: MessageEvent<SettingEvent>) => {
  console.log(e)
  if (e?.data.type == 'dev-settings-event' && e.data.messageType == 'need') {
    // 需要设置变量，需要设置到缓存中
    setOption(e.data.option)
    console.log('Option set', e.data.option)
  }
})
