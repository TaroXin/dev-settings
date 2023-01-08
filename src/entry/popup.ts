import { createApp } from 'vue'
import bootstrapAntd from '@/components/antd-register'
import App from '@/view/popup.vue'
import '@/style/antd.less'

const app = createApp(App)
bootstrapAntd(app)

app.mount('#app')
