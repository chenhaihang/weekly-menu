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
const scrollToCategory = defineModel('scrollToCategory');

const userStore = useUserStore();

const emit = defineEmits(['update:activeCategory', 'click-tab']);

function clickCategory(index) {
  activeCategory.value = index;
  scrollToCategory.value = true;
  setTimeout(() => {
    scrollToCategory.value = false;
  }, 500);

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
}

.mini-category .category-item.active {
  position: relative;
  background-color: #fff;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 8rpx;
    height: 30rpx;
    background: $primary-color;
  }
}
</style>
