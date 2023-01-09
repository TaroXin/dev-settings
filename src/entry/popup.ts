import { createApp } from 'vue'
import Vant from 'vant'
import App from '@/view/popup.vue'

const app = createApp(App)

app.use(Vant)

app.mount('#app')
