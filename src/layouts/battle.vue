<script setup lang="ts"></script>

<template>
  <el-container class="layout-default">
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
      display: flex;
      justify-content: center;

      > .main {
        padding: 0;
        overflow-y: auto;
        // width: 500px;
        flex: initial;
      }
    }
  }
</style>
