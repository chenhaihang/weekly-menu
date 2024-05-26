<template>
  <scroll-view
    class="mini-category-pane"
    id="productListId"
    :scroll-y="true"
    :enhanced="true"
    :scroll-into-view="scrollIntoView"
    :scroll-top="scrollTop"
    @scroll="onScroll"
  >
    <view
      v-for="(category, index) in categories"
      :key="category.category_id"
      :id="'category' + index"
      class="category-section"
    >
      <view class="category-title text-sm mb-2 font-medium">{{
        category.category_name
      }}</view>
      <view
        class="dish-item"
        v-for="dish in category.category_dishes"
        :key="dish.dish_id"
        @click="goToDishDetail(dish.dish_id)"
      >
        <view class="dish-image">
          <image :src="dish.dish_image_url" alt="" srcset="" />
        </view>
        <view class="dish-tips">
          <view class="dish-name font-bold mb-2 text-base">{{
            dish.dish_name
          }}</view>
          <view class="dish-ingredient-container">
            <view
              class="dish-ingredient text-sm"
              v-for="ingredient in dish.dish_ingredients"
            >
              {{ ingredient.name }}
            </view>
          </view>
          <view class="dish-sales text-sm">月销{{ dish.dish_monthSales }}</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { PropType } from 'vue';
import Taro from '@tarojs/taro';
import { useUserStore } from '@/stores/user';
import { Category } from '@/types/dish';
const props = defineProps({
  categories: {
    type: Array as PropType<Category[]>,
  },
  scrollIntoView: String,
  scrollToCategory: Boolean,
});
const scrollTop = ref(0);
const userStore = useUserStore();
const emit = defineEmits(['scroll']);
type CategoryHeights = {
  top: number;
  height: number;
};
const categoryHeights = ref([] as CategoryHeights[]); // 保存每个分类的高度
onMounted(() => {
  nextTick(() => {
    calculateCategoryHeights();
  });
});

const calculateCategoryHeights = () => {
  if (!props.categories) return;
  const query = Taro.createSelectorQuery();
  props.categories.forEach((_, index) => {
    query.select(`#category${index}`).boundingClientRect();
  });

  query.exec((res) => {
    console.log('🚀 ~ file: ProductList.vue:47 ~ query.exec ~ res:', res);
    categoryHeights.value = res.map((rect) => {
      return {
        top: rect.top,
        height: rect.height,
      };
    });
    console.log('Category Heights:', categoryHeights.value);
  });
};

function goToDishDetail(dishId: number) {
  Taro.navigateTo({
    url: `/pages/dish/dishEdit?dishId=${dishId}`,
  });
}

const onScroll = (e) => {
  console.log(
    '🚀 ~ file: ProductList.vue:59 ~ onScroll ~ e:',
    e,
    categoryHeights.value,
    userStore.menuButton.bottom
  );
  if (props.scrollToCategory) return;
  const _scrollTop = e.detail.scrollTop;
  const actuallyTop = _scrollTop + userStore.menuButton.bottom;
  for (let i = 0; i < categoryHeights.value.length; i++) {
    const item = categoryHeights.value[i];
    console.log(_scrollTop, item.top, item.height);
    if (actuallyTop >= item.top && actuallyTop < item.top + item.height) {
      emit('scroll', i);
    }
  }
};
</script>

<style scope lang="scss">
.mini-category-pane {
  background-color: #fff;
  height: 100%;
}

.category-section {
  padding: 10px;
}

.dish-item {
  padding: 5px 0;
  display: flex;
  .dish-image {
    width: 180px;
    height: 180px;
    background-color: gray;
    border-radius: 10px;
    margin-right: 10px;
    image {
      object-fit: fill;
      width: 100%;
      height: 100%;
    }
  }
  .dish-tips {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .dish-ingredient-container {
    display: flex;
    .dish-ingredient {
      padding: 3px 5px;
      background-color: #f0f0f0;
      border-radius: 5px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
