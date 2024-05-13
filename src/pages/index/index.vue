<template>
  <view class="app">
    <view class="app-content">
      <MenuIndex v-if="active === 0"></MenuIndex>
      <MyIndex v-if="active === 2"></MyIndex>
    </view>
    <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder>
      <nut-tabbar-item
        v-for="(item, index) in List"
        :key="index"
        :tab-title="item.title"
        :icon="item.icon"
        @click="active = index"
      >
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup>
import { ref, h } from 'vue';
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue-taro';
import MyIndex from '@/pages/my/index.vue';
import MenuIndex from '@/pages/menu/index.vue';

const count = ref(0);

const List = [
  {
    title: '菜谱',
    icon: h(Cart),
  },
  {
    title: '发现',
    icon: h(Find),
  },

  {
    title: '我的',
    icon: h(My),
  },
];
const active = ref(0);
getMenuButton();
function getMenuButton() {
  const res = wx.getMenuButtonBoundingClientRect();
  console.log('🚀 ~ file: index.vue:44 ~ getMenuButton ~ res:', res);
}
</script>

<style>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
