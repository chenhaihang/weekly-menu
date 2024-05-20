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
      :key="category.id"
      :id="'category' + index"
      class="category-section"
    >
      <view class="category-title">{{ category.name }}</view>
      <view
        class="product-item"
        v-for="product in category.products"
        :key="product.id"
      >
        <view class="product-image"> 图片占位 </view>
        <view class="product-tips">
          <view class="product-name">{{ product.name }}</view>
          <view class="product-tag">{{ product.tag }}</view>
          <view class="product-sales">月销{{ product.sales }}</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Taro from '@tarojs/taro';
import { useUserStore } from '@/stores/user';
const props = defineProps({
  categories: Array,
  scrollIntoView: String,
  scrollToCategory: Boolean,
});
const scrollTop = ref(0);
const userStore = useUserStore();
const emit = defineEmits(['scroll']);
const categoryHeights = ref([]); // 保存每个分类的高度
onMounted(() => {
  nextTick(() => {
    calculateCategoryHeights();
  });
});

const calculateCategoryHeights = () => {
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
  height: 100%;
}

.category-section {
  padding: 10px;
}

.category-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.product-item {
  padding: 5px 0;
  display: flex;
  .product-image {
    width: 150px;
    height: 150px;
    background-color: gray;
    border-radius: 10px;
    margin-right: 10px;
  }
  .product-tips {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
