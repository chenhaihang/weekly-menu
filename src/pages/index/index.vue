<template>
  <view class="app">
    <view class="app-content">
      <MyIndex v-if="active === 0"></MyIndex>
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
const count = ref(0);

const List = [
  {
    title: 'Home',
    icon: h(Home),
  },
  {
    title: 'Category',
    icon: h(Category),
  },
  {
    title: 'Find',
    icon: h(Find),
  },
  {
    title: 'Cart',
    icon: h(Cart),
  },
  {
    title: 'My',
    icon: h(My),
  },
];
const active = ref(0);
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
