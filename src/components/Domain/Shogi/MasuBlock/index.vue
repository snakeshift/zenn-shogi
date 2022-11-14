<script setup lang="ts">
  import { KOMA, Piece, Masu, Board } from '@/config/master'

  defineOptions({ name: 'DomainShogiMasuBlock' })

  const props = withDefaults(
    defineProps<{
      masu: Masu
    }>(),
    {
      masu: () => ({
        position: 0,
        piece: null,
      }),
    }
  )
  const { isDark, selectMasu } = useMasu(props.masu.position)
</script>

<template>
  <div class="domain-shogiMasuBlock" :class="{ isDark }" @click="selectMasu">
    <!-- <span class="index">{{ masu.position }}</span> -->
    <DomainShogiPieceBlock
      v-if="masu.piece"
      class="piece"
      :piece="masu.piece"
    />
  </div>
</template>

<style lang="scss" scoped>
  .domain-shogiMasuBlock {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.isDark {
      &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(100% + 1px);
        height: calc(100% + 1px);
        background-color: rgba(#000, 0.5);
      }
    }
    .index {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }
  }
</style>
