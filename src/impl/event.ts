export interface SettingEventOption {
  // 网页端的ID标识符，通常使用URL即可
  id: string
  label: string
  name: string
  // 需要渲染的组件
  component: 'text' | 'switch'
  initialValue?: any
  value?: any
}

export interface SettingEvent {
  type: string
  messageType: string
  option: SettingEventOption
}
