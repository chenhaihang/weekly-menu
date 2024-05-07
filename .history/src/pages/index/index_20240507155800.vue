<template>
  <view class="demo">
    <view> 欢迎使用 NutUI 开发 Taro 多端项目1 <Dongdong /> </view>
    <view className="text-[#acc855] text-[100px]">{{ count }}</view>
    <view>
      <nut-button type="primary" @click="handleClick"> Count++ </nut-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { Dongdong } from '@nutui/icons-vue-taro';

const count = ref(0);

const handleClick = () => {
  count.value++;
};
</script>

<style>
.demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
