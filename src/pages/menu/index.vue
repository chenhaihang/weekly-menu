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
      <nut-category :category="data.category" @change="change">
        <nut-category-pane
          :categoryChild="data.categoryChild"
          @onChange="onChange"
        >
        </nut-category-pane>
      </nut-category>
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
import Taro from '@tarojs/taro';
import { useUserStore } from '@/stores/user';
import categoryData1 from './categoryData.js';
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

const getData = () => {
  const { categoryInfo, categoryChild } = categoryData1;
  data.categoryInfo = categoryInfo;
  data.category = categoryInfo.category;
  data.categoryChild = categoryChild;
};

const change = (index) => {
  data.categoryChild = [].concat(
    data.categoryInfo.category[index + 1].children
  );
};
const onChange = () => {
  console.log('当前分类数据');
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
    padding: 30rpx 0;
    height: 100%;
    overflow: scroll;
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
