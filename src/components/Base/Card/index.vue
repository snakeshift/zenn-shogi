<script setup lang="ts">
// ============== import ==============
import type { CardProps } from 'element-plus'

// ============== define component option ==============
defineOptions({ name: 'BaseCard' })

// ============== props ==============
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    minHeight?: string
    shadow?: CardProps['shadow']
  }>(),
  {
    width: 'auto',
    height: 'auto',
    minHeight: 'auto',
    shadow: 'never',
  }
)
</script>

<template>
  <el-card
    class="base-card"
    :shadow="shadow"
    :style="{
      width,
      height,
      minHeight,
    }"
  >
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.base-card {
}
</style>
