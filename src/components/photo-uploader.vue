<template>
  <div class="photo-uploader" :style="{ minHeight: height + 'rpx' }">
    <template v-if="src">
      <image :src="src" class="image-class" alt="" srcset="" />
      <IconFont
        name="circle-close"
        class="circle-close"
        size="24"
        @click="imageDelete"
      ></IconFont>
    </template>
    <div
      v-else
      class="photo-uploader-btn"
      :style="{ minHeight: height + 'rpx' }"
      @click="onUpload"
    >
      <IconFont name="photograph" class="photograph-class" size="48"></IconFont>
      点击上传步骤图片
    </div>
  </div>
</template>
<script setup lang="ts">
// ------import------
import { ref, reactive } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';
// ------props------
const emit = defineEmits(['onUpload', 'onDelete']);
const props = defineProps({
  index: {
    type: Number,
  },
  height: {
    type: Number,
    default: 200,
  },
  src: {
    type: String,
  },
});
// ------data------
// ------computed------
// ------watch------
// ------methods------
function imageDelete() {
  emit('onDelete', props.index);
}

function onUpload(e: any) {
  // const file = e.target.files[0];
  // const reader = new FileReader();
  const url = 'https://www.baidu.com/img/bd_logo1.png?t=20190926';
  if (props.index == null) {
    emit('onUpload', { url });
  } else {
    emit('onUpload', {
      url,
      index: props.index,
    });
  }
  // reader.onload = (event: any) => {
  //   const data = event.target.result;
  //   const img = new Image();
  //   img.onload = () => {
  //     // 调用父组件方法
  //     emit('onUpload', data);
  //   };
  // };
}
// ------lifecycle hooks------
</script>
<style scope lang="scss">
.photo-uploader {
  width: 100%;
  position: relative;
  .photo-uploader-btn {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .circle-close {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
  }
  .image-class {
    width: 100%;
    object-fit: cover;
  }
  .photograph-class {
    margin-bottom: 30rpx;
  }
}
</style>
