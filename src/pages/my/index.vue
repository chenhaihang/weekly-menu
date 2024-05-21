<template>
  <div class="my">
    <div
      class="my-container"
      :style="{
        paddingTop: userStore.menuButton.bottom + 'px',
      }"
    ></div>
    <div class="user-info-container">
      <div class="left">
        <div class="avatar">头像</div>
        <div class="user-info">
          <div class="username">用户名</div>
          <div class="user-tag">用户标签</div>
        </div>
      </div>
      <div class="right">
        <div class="sign-in-btn text-base">签到</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
// ------props------
// ------data------
const userStore = useUserStore();

// ------computed------
// ------watch------
// ------methods------

// ------lifecycle hooks------
</script>
<style scope lang="scss">
.my {
  padding: 30px;
  .my-container {
    width: calc(100vw - 60px);
  }
  .user-info-container {
    display: flex;
    justify-content: space-between;
    .avatar {
      width: 100px;
      height: 100px;
      background-color: gray;
      border-radius: 50%;
      margin-right: 20px;
    }
    .left {
      display: flex;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .username {
        font-size: 40px;
        font-weight: bold;
      }
      .user-tag {
        font-size: 28px;
        color: #999;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .sign-in-btn {
        width: 120px;
        height: 60px;
        background-color: $primary-color;
        color: #fff;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
