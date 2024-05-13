import { createApp } from 'vue'
import './app.scss'
import { createPinia } from 'pinia'
import Taro from '@tarojs/taro';
import { useUserStore } from './stores/user';


function login() {
  Taro.login({
    success: function (res) {
      console.log('🚀 ~ file: index.vue:23 ~ loginBtn ~ res:', res);
    },
  });
}
const App = createApp({

  onLaunch() {
    login()
  },
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())
const store = useUserStore();

export default App
