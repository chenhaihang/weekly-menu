import { createApp } from 'vue'
import './app.scss'
import { createPinia } from 'pinia'
import Taro from '@tarojs/taro';
import { useUserStore } from './stores/user';
import "@nutui/nutui-taro/dist/style.css";
function login() {
  Taro.login({
    success: function (res) {
      console.log('🚀 ~ file: index.vue:23 ~ loginBtn ~ res:', res);
    },
  });
}

function getMenuButton() {
  const res = Taro.getMenuButtonBoundingClientRect();
  const systemInfo = Taro.getSystemInfoSync();
  console.log("🚀 ~ file: app.ts:19 ~ getMenuButton ~ SystemInfo:", systemInfo)
  console.log("🚀 ~ file: app.ts:18 ~ getMenuButton ~ res:", res)
  userStore.setMenuButton(res)
  userStore.setSystemInfo(systemInfo)
}
const App = createApp({

  onLaunch() {
    login()
    getMenuButton();
  },
  onShow(options) {

  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())
const userStore = useUserStore();

export default App
