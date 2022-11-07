<script setup lang="ts">
  import { KOMA, TEBAN, Piece, Board } from '@/config/master'

  defineOptions({ name: 'DomainShogiPieceBlock' })

  const props = withDefaults(
    defineProps<{
      piece: Piece
    }>(),
    {
      piece: () => ({
        position: 0,
        koma: KOMA.HU,
        komaImg: '',
        teban: TEBAN.SENTE,
        isNari: false,
        isOwn: false,
      }),
    }
  )

  const { isSelected } = usePiece({
    piece: props.piece,
  })
</script>

<template>
  <div class="domain-shogiPieceBlock" :class="{ isSelected }">
    <img
      :src="piece?.komaImg"
      class="image"
      :class="{
        isReverse: !piece?.isOwn,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
  .domain-shogiPieceBlock {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > .image {
      width: 95%;
      will-change: filter;
      filter: drop-shadow(1px 2px 2px #333);
      &.isReverse {
        transform: rotate(180deg);
        filter: drop-shadow(-1px -2px 2px #333);
      }
    }
    &.isSelected {
      > .image {
        transform: translateX(-3px) translateY(-3px);
        animation: blink 0.8s ease-in-out infinite alternate;
        width: 100%;
        z-index: 1;
        @keyframes blink {
          0% {
            filter: contrast(1) opacity(0.9) drop-shadow(4px 4px 2px #333);
          }
          100% {
            filter: contrast(1.3) opacity(1) drop-shadow(4px 4px 4px #333);
          }
        }
        &.isReverse {
          transform: translateX(3px) translateY(3px) rotate(180deg);
        }
      }
    }
  }
</style>
