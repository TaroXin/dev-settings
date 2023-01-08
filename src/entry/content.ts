function keyName(name: string): string {
  const CONTENT_KEY_HEADER = '@taroxin'
  return `${CONTENT_KEY_HEADER}${name}`
}

async function setSettings() {
  const values = await chrome.storage.local.get('settingConfig')
  if (values.settingConfig) {
    // 设置参数
    for (let key in values.settingConfig) {
      const value = values.settingConfig[key]
      key = keyName(key)
      localStorage.removeItem(key)
      localStorage.setItem(key, value)
    }
    console.log('Successful to set settings!')
  }
}

setSettings()
console.log('Success!11111')
