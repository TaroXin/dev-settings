import { createApp } from 'vue'
import App from '@/view/devtools.vue'

chrome.devtools.panels.create('dev-settings', '', 'devtools.html')

createApp(App).mount('#app')
