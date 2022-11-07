<script setup lang="ts">
  import Header from './default/Header.vue'
</script>

<template>
  <el-container class="layout-default">
    <Header />
    <el-container class="container">
      <el-main class="main">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
  .layout-default {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(87, 129, 118, 0.1);
    > .container {
      margin: auto;
      width: 100%;

      > .main {
        padding: 0;
        overflow-y: auto;
        width: 500px;
      }
    }
  }
</style>
