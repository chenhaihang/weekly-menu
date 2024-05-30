<template>
  <view class="app">
    <view class="app-content">
      <DishIndex v-if="active === 0"></DishIndex>
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
import MyIndex from '@/pages/my/index.vue';
import DishIndex from '@/pages/dish/index.vue';
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue-taro';

const List = [
  {
    title: '菜谱',
    icon: h(Cart),
  },
  {
    title: '广场',
    icon: h(Find),
  },

  {
    title: '我的',
    icon: h(My),
  },
];
const active = ref(0);
</script>

<style scope lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .app-content {
    height: calc(
      100vh - var(--nut-tabbar-height) - env(safe-area-inset-bottom) - 6rpx
    );
  }
}
</style>
