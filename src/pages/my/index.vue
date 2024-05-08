<template>
  <div class="my">
    <div class="avatar"></div>
    <button
      open-type="getPhoneNumber"
      class="login_button"
      @bindgetphonenumber="loginBtn"
    >
      登录
    </button>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import Taro from '@tarojs/taro';

// ------props------
// ------data------
// ------computed------
// ------watch------
// ------methods------
function loginBtn(e) {
  console.log('🚀 ~ file: index.vue:18 ~ loginBtn ~ e:', e);
  Taro.login({
    success: function (res) {
      console.log('🚀 ~ file: index.vue:23 ~ loginBtn ~ res:', res);
    },
  });
}
// ------lifecycle hooks------
</script>
<style scope lang="scss">
.my {
}
</style>
