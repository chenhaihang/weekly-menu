<template>
  <div class="menu" :style="{ paddingBottom: actionContainerRefHeight + 'px' }">
    <div
      class="top-container"
      :style="{
        height: userStore.menuButton.bottom + 'px',
      }"
    >
      <div
        class="search-header"
        :style="{
          top: userStore.menuButton.top + 'px',
          width: userStore.menuButton.left + 'px',
        }"
      >
        <nut-searchbar
          v-model="searchValue"
          placeholder="请输入要查找的菜谱"
          @search="searchBtn"
        >
          <template #rightout>搜索</template>
        </nut-searchbar>
      </div>
    </div>
    <div
      class="menu-container"
      :style="{
        paddingTop: userStore.menuButton.bottom + 'px',
      }"
    >
      <mini-category
        :categories="categories"
        v-model:activeCategory="activeCategory"
        @click-tab="clickTab"
      >
        <mini-category-pane
          :categories="categories"
          :scroll-into-view="scrollIntoView"
          @scroll="updateActiveCategory"
        />
      </mini-category>
    </div>
    <div class="action-container" id="actionContainerId">
      <nut-button type="default">分类管理</nut-button>
      <nut-button type="primary">添加商品</nut-button>
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import Taro from '@tarojs/taro';
import MiniCategory from '@/components/mini-category.vue';
import MiniCategoryPane from '@/components/mini-category-pane.vue';

const categories = ref([
  {
    id: 1,
    name: '分类1',
    products: [
      { id: 1, name: '商品1-1' },
      { id: 2, name: '商品1-2' },
      { id: 3, name: '商品1-3' },
      { id: 4, name: '商品1-4' },
      { id: 5, name: '商品1-5' },
      { id: 6, name: '商品1-6' },
      { id: 7, name: '商品1-7' },
      { id: 8, name: '商品1-8' },
      { id: 9, name: '商品1-9' },
    ],
  },
  {
    id: 2,
    name: '分类2',
    products: [
      { id: 13, name: '商品2-1' },
      { id: 14, name: '商品2-2' },
      { id: 15, name: '商品2-3' },
      { id: 16, name: '商品2-4' },
      { id: 17, name: '商品2-5' },
      { id: 18, name: '商品2-6' },
      { id: 19, name: '商品2-7' },
      { id: 20, name: '商品2-8' },
      { id: 21, name: '商品2-9' },
      { id: 22, name: '商品2-10' },
      { id: 23, name: '商品2-11' },
      { id: 24, name: '商品2-12' },
      { id: 25, name: '商品2-13' },
      { id: 26, name: '商品2-14' },
      { id: 27, name: '商品2-15' },
      { id: 28, name: '商品2-16' },
      { id: 29, name: '商品2-17' },
      { id: 30, name: '商品2-18' },
      { id: 31, name: '商品2-19' },
      { id: 32, name: '商品2-20' },
    ],
  },
  {
    id: 3,
    name: '分类4',
    products: [
      { id: 441, name: '商品1-1' },
      { id: 442, name: '商品1-2' },
      { id: 443, name: '商品1-3' },
      { id: 444, name: '商品1-4' },
      { id: 445, name: '商品1-5' },
      { id: 446, name: '商品1-6' },
      { id: 447, name: '商品1-7' },
      { id: 448, name: '商品1-8' },
      { id: 449, name: '商品1-9' },
    ],
  },
  // 添加更多分类和商品
]);

const activeCategory = ref(0);
const scrollIntoView = ref('');

const updateActiveCategory = (index) => {
  activeCategory.value = index;
};
// ------props------
// ------data------
const userStore = useUserStore();
const searchValue = ref('');
const actionContainerRefHeight = ref(0);

const data = reactive({
  categoryInfo: {},
  category: [{}],
  categoryChild: [{}],
});
// ------computed------
// ------watch------
// ------methods------
function searchBtn(val: any) {}

const getData = () => {};

const change = (index) => {};
const clickTab = (index) => {
  scrollIntoView.value = `category${index}`;
};
// ------lifecycle hooks------
onMounted(() => {
  Taro.createSelectorQuery()
    .select('#actionContainerId')
    .boundingClientRect()
    .exec((res) => {
      console.log(res);
      const height = res[0]?.height;
      if (height) {
        // height 取整
        actionContainerRefHeight.value = height;
      }
    });
  setTimeout(() => {
    getData();
  }, 500);
});
</script>
<style scope lang="scss">
.menu {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .top-container {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
  }
  .search-header {
    position: fixed;
    left: 0;
    .nut-searchbar {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
  .menu-container {
    display: flex;
    height: 100%;
    width: 100vw;
    box-sizing: border-box;
  }
  .action-container {
    background-color: #fff;
    padding: 30rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    button {
      box-sizing: border-box;
      flex-grow: 1;
      &:not(:nth-last-child(1)) {
        margin-right: 30rpx;
      }
    }
  }
}
</style>
