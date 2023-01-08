import type { App } from 'vue'
import { Button, Input, List, Space, Switch } from 'ant-design-vue'

export default function bootstrap(app: App) {
  app.use(Button)
  app.use(List)
  app.use(Switch)
  app.use(Input)
  app.use(Space)
}
