import type { App } from 'vue'
import { Button } from 'ant-design-vue'

export default function bootstrap(app: App) {
  app.use(Button)
}
