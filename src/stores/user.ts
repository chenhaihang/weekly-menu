import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ openId: 0, name: 'Eduardo' }),
  getters: {
    getOpenId: (state) => state.openId, // 获取openid
  },
  actions: {
    setOpenId(openId: string) {
      this.openId = openId
    },
  },
})