<template>
  <div class="menu">
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
        marginTop: userStore.menuButton.bottom + 'px',
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
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import categoryData1 from './categoryData.js';
// ------props------
// ------data------
const userStore = useUserStore();
const searchValue = ref('');

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
  setTimeout(() => {
    getData();
  }, 500);
});
</script>
<style scope lang="scss">
.menu {
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
    }
  }
  .menu-container {
    padding: 30px 0;
  }
}
</style>
