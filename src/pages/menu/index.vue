<template>
  <div class="menu">
    <div class="search-header">
      <nut-searchbar v-model="searchValue" @search="searchBtn">
        <template #rightout> Search </template>
      </nut-searchbar>
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref } from 'vue';
// ------props------
// ------data------

const searchValue = ref('');
// ------computed------
// ------watch------
// ------methods------
function searchBtn(val: any) {}

// ------lifecycle hooks------
</script>
<style scope lang="scss">
.my {
}
</style>
