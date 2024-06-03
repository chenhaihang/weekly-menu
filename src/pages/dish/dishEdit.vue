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
      <nut-cell
        :title="dishInfo.dish_category || '选择分类'"
        is-link
        @click="actionSheetShow = true"
      ></nut-cell>
      <!-- <nut-form> -->
      <!-- <nut-input v-model="val" placeholder="Placeholder" /> -->
      <!-- </nut-form> -->
      <nut-action-sheet v-model:visible="actionSheetShow">
        <nut-picker :columns="columns" title="选择分类" @confirm="confirm" />
      </nut-action-sheet>
      <div class="dish-ingredients-container">
        <div class="dish-ingredients-title">用料</div>
        <div class="dish-ingredients-input">
          <div
            class="dish-ingredients-item"
            v-for="(item, index) in dishInfo.dish_ingredients"
            :key="index"
          >
            <nut-input
              class="dish-input dish-ingredients-name"
              v-model="item.name"
              placeholder="食材：如鸡蛋"
            />
            <nut-input
              class="dish-input dish-ingredients-quantity"
              v-model="item.quantity"
              placeholder="用量：如100克"
            />
          </div>
        </div>
        <div class="dish-action-container">
          <nut-button type="primary" @click="addIngredients"
            >添加用料</nut-button
          >
        </div>
      </div>
      <div class="dish-step-container">
        <div class="dish-step-title">做法</div>
        <div
          class="dish-step-item"
          v-for="(item, index) in dishInfo.dish_steps"
          :key="index"
        >
          <view class="dish-step-name">步骤{{ index + 1 }}</view>
          <photoUploader
            :src="item.step_img_url"
            :index="index"
            :height="320"
            @onUpload="photoUploaderChange"
            @onDelete="photoUploaderDelete"
          ></photoUploader>
          <nut-textarea
            v-model="item.step_description"
            :max-length="120"
            autosize
            placeholder="填写步骤说明"
            rows="4"
          />
        </div>
        <div class="dish-action-container">
          <nut-button type="primary" @click="addDishStep">添加步骤</nut-button>
        </div>
      </div>
    </div>
    <div class="advanced-setup-container">
      <nut-collapse>
        <nut-collapse-item name="name1" title="高级设置">
          <nut-form>
            <nut-form-item label="卡路里">
              <nut-input
                v-model="dishInfo.dish_energy.calories.value"
                placeholder="卡路里/kcal"
                type="text"
              />
            </nut-form-item>
            <nut-form-item label="蛋白质">
              <nut-input
                v-model="dishInfo.dish_energy.protein.value"
                placeholder="蛋白质/g"
                type="text"
              />
            </nut-form-item>
            <nut-form-item label="碳水化合物">
              <nut-input
                v-model="dishInfo.dish_energy.carbs.value"
                placeholder="碳水化合物/g"
                type="text"
              />
            </nut-form-item>
            <nut-form-item label="脂肪">
              <nut-input
                v-model="dishInfo.dish_energy.fat.value"
                placeholder="脂肪/g"
                type="text"
              />
            </nut-form-item>
          </nut-form>
        </nut-collapse-item>
      </nut-collapse>
    </div>
    <div class="dish-submit-container mt-2">
      <nut-button type="primary" block @click="submitBtn">保存菜谱</nut-button>
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import { useDishStore } from '@/stores/dish';
import photoUploader from '@/components/photo-uploader.vue';
// import { Category } from '@/types/dish';
// ------props------
// ------data------
const uploadUrl = 'http://www.baidu.com';
const defaultFileList = reactive([]);
const dishInfo = reactive({
  dish_name: '',
  dish_description: '',
  dish_category: '',
  dish_ingredients: [
    {
      name: '',
      quantity: '',
    },
  ],
  dish_steps: [
    {
      step_description: '',
      step_img_url: '',
    },
  ],
  dish_energy: {
    calories: {
      value: '',
      unit: '千卡',
    },

    protein: {
      value: '',
      unit: '克',
    },
    fat: {
      value: '',
      unit: '克',
    },
    carbs: {
      value: '',
      unit: '克',
    },
  },
});
const actionSheetShow = ref(false);
const dishStore = useDishStore();
const columns = dishStore.getCategoryPickerList;
console.log('🚀 ~ file: dishEdit.vue:39 ~ columns:', columns);
// ------computed------
// ------watch------
// ------methods------
function photoUploaderChange({ url, index }) {
  console.log(
    '🚀 ~ file: dishEdit.vue:172 ~ photoUploaderChange ~ url, index:',
    url,
    index
  );
  dishInfo.dish_steps[index].step_img_url = url;
}

function photoUploaderDelete(index) {
  dishInfo.dish_steps[index].step_img_url = '';
}

function confirm(item) {
  console.log('🚀 ~ file: dishEdit.vue:43 ~ confirm ~ item:', item);
  dishInfo.dish_category = item.selectedOptions[0].text;
  console.log('🚀 ~ file: dishEdit.vue:55 ~ confirm ~ dishInfo:', dishInfo);
  actionSheetShow.value = false;
}

function addIngredients() {
  dishInfo.dish_ingredients.push({
    name: '',
    quantity: '',
  });
}
function addDishStep() {
  dishInfo.dish_steps.push({
    step_description: '',
    step_img_url: '',
  });
}

function submitBtn() {
  console.log('🚀 ~ file: dishEdit.vue:68 ~ submitBtn ~ dishInfo:', dishInfo);
}
// ------lifecycle hooks------
</script>
<style scope lang="scss">
.dish-edit {
  padding: 30px;
  .dish-ingredients-item {
    display: flex;
    .dish-input {
      width: 50%;
    }
  }
  .photo-uploader {
    margin-bottom: 30rpx;
  }

  .dish-submit-container {
  }
}
</style>
