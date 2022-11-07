<script setup lang="ts">
  // ============== import ==============
  import type { InputProps } from 'element-plus'

  // ============== define component option ==============
  defineOptions({ name: 'BaseTextField' })

  // ============== props ==============
  const props = withDefaults(
    defineProps<{
      modelValue: string
      placeholder?: string
      clearable?: boolean
      size?: InputProps['size']
      maxlength?: string | number
      disabled?: boolean
    }>(),
    {
      modelValue: '',
      placeholder: '入力してください',
      clearable: true,
      size: 'large',
      maxlength: undefined,
      disabled: false,
    }
  )

  // ============== emits ==============
  const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
    (event: 'input', value: string): any
    (event: 'change', value: string): any
    (event: 'clear'): void
  }>()

  // ============== ref/reactive/computed/methods ==============
  const inputValue = computed({
    get: () => props.modelValue,
    set: (value: string) => emits('update:modelValue', value),
  })
</script>

<template>
  <el-input
    v-model="inputValue"
    class="base-textField"
    :placeholder="placeholder"
    :clearable="clearable"
    :size="size"
    :disabled="disabled"
    :maxlength="maxlength"
    :show-word-limit="!!maxlength"
    @input="(v: string) => emits('input', v)"
    @change="(v: string) => emits('change', v)"
    @clear="emits('clear')"
  ></el-input>
</template>

<style lang="scss" scoped>
  .base-textField {
    width: 100%;
  }
</style>
