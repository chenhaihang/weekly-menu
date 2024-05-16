import { defineStore } from 'pinia'

interface State {
  openId: number
  menuButton: MenuButton
  systemInfo: SystemInfo
}

interface MenuButton {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
}

interface SystemInfo {
  screenHeight: number
  screenWidth: number
  statusBarHeight?: number
  system: string
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    openId: 0,
    menuButton: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    },
    systemInfo: {
      screenHeight: 0,
      screenWidth: 0,
      statusBarHeight: 0,
      system: ''
    }
  }),
  getters: {
    getOpenId: (state) => state.openId, // 获取openid
  },
  actions: {
    setOpenId(openId: string) {
      this.openId = openId
    },
    setMenuButton(menuButton: MenuButton) {
      this.menuButton = menuButton
    },
    setSystemInfo(systemInfo: SystemInfo) {
      this.systemInfo = systemInfo
    },
  },
})