import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import './styles/common.scss'
import Icon from './components/Icon.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  // 全局注册 Icon 组件
  app.component('Icon', Icon)
  return {
    app
  }
}
