/* eslint-disable */
import { devSettings } from './entry/content'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  
  const component: DefineComponent<{}, {}, any>
  export default component
}
