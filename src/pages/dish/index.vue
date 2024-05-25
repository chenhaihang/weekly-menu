<template>
  <div class="dish" :style="{ paddingBottom: actionContainerRefHeight + 'px' }">
    <div
      class="top-container"
      :style="{
        height: userStore.menuButton.bottom + 10 + 'px',
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
          <template #rightin>
            <div
              class="search-btn px-2 py-0.5 text-sm rounded-3xl"
              @click="searchBtn"
            >
              搜索
            </div>
          </template>
        </nut-searchbar>
      </div>
    </div>
    <div
      class="dish-container"
      :style="{
        paddingTop: userStore.menuButton.bottom + 10 + 'px',
      }"
    >
      <mini-category
        :categories="categories"
        v-model:activeCategory="activeCategory"
        v-model:scrollToCategory="scrollToCategory"
        @click-tab="clickTab"
      >
        <mini-category-pane
          :categories="categories"
          :scroll-into-view="scrollIntoView"
          :scrollToCategory="scrollToCategory"
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
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Taro from '@tarojs/taro';
import MiniCategory from '@/components/mini-category.vue';
import MiniCategoryPane from '@/components/mini-category-pane.vue';
import { Category } from '@/types/dish';
const categories = ref([
  {
    category_id: 1,
    category_name: '分类1',
    category_dishes: [
      {
        dish_id: 1,
        category_id: 1,
        dish_name: '番茄炒蛋',
        dish_price: 18,
        dish_monthSales: 100,
        dish_kal: 1100,
        dish_image_url: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        dish_description: '这是一条菜品描述',
        dish_notes: '这是一条备注',
        dish_created_at: '2024-01-01 12:34:52',
        dish_updated_at: '2024-04-01 12:34:52',
        dish_rating: 5,
        dish_ingredients: [
          { name: '番茄', quantity: 100 },
          { name: '鸡蛋', quantity: 100 },
        ],
      },
    ],
  },
  {
    category_id: 2,
    category_name: '分类1',
    category_dishes: [
      {
        dish_id: 2,
        category_id: 2,
        dish_name: '番茄炒蛋',
        dish_price: 18,
        dish_monthSales: 100,
        dish_kal: 1100,
        dish_image_url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        dish_description: '这是一条菜品描述',
        dish_notes: '这是一条备注',
        dish_created_at: '2024-01-01 12:34:52',
        dish_updated_at: '2024-04-01 12:34:52',
        dish_rating: 5,
        dish_ingredients: [
          { name: '番茄', quantity: 100 },
          { name: '鸡蛋', quantity: 100 },
        ],
      },
    ],
  },
  // 添加更多分类和商品
] as Category[]);

const scrollToCategory = ref(false);
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
.dish {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .top-container {
    background: linear-gradient(145deg, #daf3db, #c0eec2);
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
      background-color: transparent;
    }
    .search-btn {
      color: #fff;
      background-color: var(--nut-primary-color);
    }
  }
  .dish-container {
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
