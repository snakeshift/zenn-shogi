<script setup lang="ts">
  // ============== import ==============
  import type { ButtonProps } from 'element-plus'

  // ============== define component option ==============
  defineOptions({ name: 'BaseButton' })

  // ============== props ==============
  const props = withDefaults(
    defineProps<{
      type?: ButtonProps['type']
      disabled?: ButtonProps['disabled']
      link?: ButtonProps['link']
      text?: ButtonProps['text']
      icon?: ButtonProps['icon']
      loading?: ButtonProps['loading']
      size?: ButtonProps['size']
      color?: ButtonProps['color']
      plain?: ButtonProps['plain']
      bg?: ButtonProps['bg']
      round?: ButtonProps['round']
      circle?: ButtonProps['circle']
      nativeType?: ButtonProps['nativeType']
    }>(),
    {
      type: '',
      disabled: false,
      link: false,
      text: false,
      icon: undefined,
      loading: false,
      size: 'default',
      color: '',
      plain: false,
      bg: false,
      round: false,
      circle: false,
      nativeType: 'button',
    }
  )
</script>

<template>
  <div class="base-button">
    <el-button
      :type="type"
      :disabled="disabled"
      :link="link"
      :text="text"
      :icon="icon"
      :loading="loading"
      :size="size"
      :color="color"
      :plain="plain"
      :bg="bg"
      :round="round"
      :circle="circle"
      :nativeType="nativeType"
    >
      <slot></slot>
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
  .base-button {
    display: inline-block;
    & + .base-button {
      margin-left: 12px;
    }
  }
</style>
