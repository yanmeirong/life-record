import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import './styles/common.scss'
import SvgIcon from './components/SvgIcon.vue'
//  import './static/icons/iconfont.js' 

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  // 全局注册 Icon 组件
  app.component('SvgIcon', SvgIcon)
  return {
    app
  }
}
