<template>
  <div class="dish-category-edit">
    <div class="category-list-container">
      <div class="category-item" v-for="item in categoryList" :key="item.id">
        <div class="category-name">分类1</div>
        <div class="category-btn">
          <IconFont class="btn-item" size="16" name="rect-up"></IconFont>
          <IconFont class="btn-item" size="16" name="rect-down"></IconFont>
          <IconFont
            class="btn-item"
            size="16"
            name="circle-close"
            color="red"
          ></IconFont>
        </div>
      </div>
    </div>
    <div class="fixed-bottom-container">
      <nut-button type="primary" block @click="addCategoryBtn"
        >添加分类</nut-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';
// ------props------
// ------data------
const categoryList = ref([
  {
    id: 1,
    name: '分类1',
    sort: 1,
  },
  {
    id: 2,
    name: '分类2',
    sort: 2,
  },
  {
    id: 3,
    name: '分类3',
    sort: 3,
  },
]);
// ------computed------
// ------watch------
// ------methods------
function addCategoryBtn() {}
// ------lifecycle hooks------
</script>
<style scope lang="scss">
.dish-category-edit {
  padding: 30px;
  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    .btn-item {
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
