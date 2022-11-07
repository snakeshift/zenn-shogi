<script setup lang="ts">
  // ============== props ==============
  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      title?: string
      width?: string
    }>(),
    {
      modelValue: false,
      title: '',
      width: '450px',
    }
  )

  // ============== define component option ==============
  defineOptions({ name: 'BaseDialog' })

  // ============== emits ==============
  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>()

  // ============== ref/reactive/computed/methods ==============
  const inputValue = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emits('update:modelValue', value),
  })
</script>

<template>
  <div class="base-dialog">
    <el-dialog v-model="inputValue" :title="title" :width="width">
      <slot />
      <template #footer>
        <slot name="footer" />
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .base-dialog {
    :deep(.el-dialog) {
      max-width: 90%;
      .el-dialog__body {
        padding-top: 0;
      }
    }
  }
</style>
