<template>
  <!--截图组件-->
  <screen-short
    v-if="screenshotStatus"
    @destroy-component="destroyComponent"
    @get-image-data="getImg"
    :clickCutFullScreen="1"
  >
    dfdfdfdf dfdfdfdf dfdfdfdf dfdfdfdf dfdfdfdf dfdfdfdf dfdfdfdf dfdfdfdf
    dfdfdfdf dfdfdfdf
  </screen-short>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const screenshotStatus = ref<boolean>(true);
    // 销毁组件函数
    const destroyComponent = function (status: boolean) {
      screenshotStatus.value = status;
    };
    // 获取裁剪区域图片信息
    const getImg = function (base64: string) {
      console.log("截图组件传递的图片信息", base64);
    };

    return {
      screenshotStatus,
      destroyComponent,
      getImg,
    };
  },
});
</script>
