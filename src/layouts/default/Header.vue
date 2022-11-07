<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
</script>

<template>
  <el-header class="default-header" height="54">
    <div class="title">将棋を作りながら学ぶ Nuxt3 × Amplify</div>
  </el-header>
</template>

<style lang="scss" scoped>
  .default-header {
    padding: 0;
    > .title {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 54px;
      background-color: $primaryColor;
      font-family: 'tsukushi';
      padding: 0 12px;
      font-size: 16px;

      > .image {
        width: 45px;
        margin-left: 0px;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
</style>
