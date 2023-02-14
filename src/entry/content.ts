import { STORAGE_EVENT_OPTIONS_KEY } from '@/enum/keys'

interface SettingEventOption {
  label: string
  name: string
  initialValue: string
  // 需要渲染的组件
  component: 'text' | 'switch'
  value: string | boolean
}

interface SettingEvent {
  type: string
  messageType: string
  option: SettingEventOption
}

// function keyName(name: string): string {
//   const CONTENT_KEY_HEADER = '@dev-settings'
//   return `${CONTENT_KEY_HEADER}/${name}`
// }

// async function loadSettings() {
//   const values = await chrome.storage.local.get('settingConfig')
//   if (values.settingConfig) {
//     // 设置参数
//     for (let key in values.settingConfig) {
//       const value = values.settingConfig[key]
//       key = keyName(key)
//       localStorage.removeItem(key)
//       localStorage.setItem(key, value)
//     }
//   }

//   console.warn('DevSettings loaded successfully')
// }

async function setOption(option: SettingEventOption) {
  let { [STORAGE_EVENT_OPTIONS_KEY]: optionList } = await chrome.storage.local.get(STORAGE_EVENT_OPTIONS_KEY)

  optionList = optionList ?? []
  const existIndex = optionList?.findIndex((o: SettingEventOption) => o.name == option.name)
  if (existIndex > -1) {
    let exist = optionList[existIndex]
    exist = {
      ...option,
      value: option.value,
    }
    ;(optionList as SettingEventOption[]).splice(existIndex, 1, exist)
  }
  else {
    (optionList as SettingEventOption[]).push(option)
  }

  await chrome.storage.local.set({
    [STORAGE_EVENT_OPTIONS_KEY]: optionList,
  })

  const value = await chrome.storage.local.get(STORAGE_EVENT_OPTIONS_KEY)
  console.log(value)
}

console.log('DevSettings content script loaded')
window.addEventListener('message', (e: MessageEvent<SettingEvent>) => {
  console.log('设置内容', e)
  if (e?.data.type == 'dev-settings-event' && e.data.messageType == 'need') {
    // 需要设置变量，需要设置到缓存中
    setOption(e.data.option)
  }
})
