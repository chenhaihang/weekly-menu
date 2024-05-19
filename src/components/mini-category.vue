<template>
  <div class="mini-category">
    <div class="category-left">
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="category-item"
        :class="{ active: activeCategory === index }"
        @click="clickCategory(index)"
      >
        {{ category.name }}
      </div>
    </div>
    <div class="category-right">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import { useUserStore } from '@/stores/user';

const props = defineProps({
  categories: Array,
});
const activeCategory = defineModel('activeCategory');

const userStore = useUserStore();

const emit = defineEmits(['update:activeCategory', 'click-tab']);

function clickCategory(index) {
  activeCategory.value = index;
  emit('click-tab', index);
}
</script>

<style scope lang="scss">
.mini-category {
  width: 100%;
  background: #f0f0f0;
  height: 100%;
  display: flex;
}
.category-left {
  width: 30%;
  overflow-y: scroll;
}
.category-right {
  width: 70%;
  height: 100%;
}

.mini-category .category-item {
  padding: 10px;
}

.mini-category .category-item.active {
  background: #007aff;
  color: #fff;
}
</style>
