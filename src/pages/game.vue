<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    pageTransition: {
      name: 'slide',
    },
  })
</script>

<template>
  <div class="page-game">
    <DomainShogiBoardBlock />
  </div>
</template>

<style lang="scss" scoped>
  .page-game {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
