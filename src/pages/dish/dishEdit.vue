<template>
  <div class="dish-edit">
    <div class="dish-base-detail">
      <nut-uploader
        :url="uploadUrl"
        v-model:file-list="defaultFileList"
        :multiple="false"
      ></nut-uploader>
      <nut-input v-model="dishInfo.dish_name" placeholder="菜谱名称" />
      <nut-textarea
        v-model="dishInfo.dish_description"
        limit-show
        :max-length="120"
        autosize
        placeholder="分享这道美食背后的故事"
      />
      <nut-picker :columns="columns" title="选择分类" @confirm="confirm" />
      <!-- <nut-form> -->
      <!-- <nut-input v-model="val" placeholder="Placeholder" /> -->
      <!-- </nut-form> -->
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import { useDishStore } from '@/stores/dish';
import { Category } from '@/types/dish';
// ------props------
// ------data------
const uploadUrl = 'http://www.baidu.com';
const defaultFileList = reactive([]);
const dishInfo = reactive({
  dish_name: '',
  dish_description: '',
});
const dishStore = useDishStore();
const columns = dishStore.getCategoryPickerList;
console.log('🚀 ~ file: dishEdit.vue:39 ~ columns:', columns);
// ------computed------
// ------watch------
// ------methods------
function confirm(item: Category) {
  console.log('🚀 ~ file: dishEdit.vue:43 ~ confirm ~ item:', item);
}
// ------lifecycle hooks------
</script>
<style scope lang="scss">
.dish-edit {
  padding: 30px;
}
</style>
