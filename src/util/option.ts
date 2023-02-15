import { STORAGE_EVENT_OPTIONS_KEY } from '@/enum/keys'
import type { SettingEventOption } from '@/impl/event'

async function _saveOption(updateOptions: SettingEventOption[], useOptionValue: boolean) {
  const values = await chrome.storage.local.get(STORAGE_EVENT_OPTIONS_KEY)

  const optionList: SettingEventOption[] = values[STORAGE_EVENT_OPTIONS_KEY] || []
  let newOptionList: SettingEventOption[] = []
  for (let i = 0; i < updateOptions.length; i++) {
    const update = updateOptions[i]
    const existIndex = optionList.findIndex(o => update.name == o.name && update.id == o.id)
    if (existIndex > -1) {
      let exist = optionList[existIndex]
      exist = {
        ...update,
        value: useOptionValue ? update.value : exist.value ?? (update.value || update.initialValue),
      }
      optionList.splice(existIndex, 1, exist)
    }
    else {
      newOptionList = [...newOptionList, update]
    }
  }
  newOptionList = [...optionList, ...newOptionList]

  await chrome.storage.local.set({
    [STORAGE_EVENT_OPTIONS_KEY]: newOptionList,
  })
}

export async function setOption(...updateOptions: SettingEventOption[]) {
  await _saveOption(updateOptions, false)
}

export async function setOptionValue(...updateOptions: SettingEventOption[]) {
  await _saveOption(updateOptions, true)
}
