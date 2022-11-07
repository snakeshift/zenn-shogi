<script setup lang="ts">
  import { TEBAN } from '@/config/master'

  defineOptions({ name: 'DomainShogiBoardBlock' })

  const { gameState } = useGame()
  const { board } = useBoard()
  const { masu } = useMasu()
</script>

<template>
  <div class="domain-shogiBoardBlock">
    <div class="wrapper">
      <template
        v-for="dan in gameState.player === TEBAN.GOTE ? board.reverse() : board"
      >
        <DomainShogiMasuBlock
          v-for="masu in gameState.player === TEBAN.GOTE ? dan.reverse() : dan"
          class="masu"
          :masu="masu"
        />
      </template>
    </div>
    <div class="edge" v-for="n in 4" />
  </div>
</template>

<style lang="scss" scoped>
  .domain-shogiBoardBlock {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-image: url('~/assets/images/shogi/board.png');
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
    box-shadow: 6px 6px 2px 1px rgba($primaryColor, 0.4);
    position: relative;
    user-select: none;
    > .wrapper {
      display: grid;
      grid-template-rows:
        v-bind('masu.height') v-bind('masu.height') v-bind('masu.height') v-bind(
          'masu.height'
        )
        v-bind('masu.height')
        v-bind('masu.height') v-bind('masu.height') v-bind('masu.height') v-bind('masu.height');
      grid-template-columns:
        v-bind('masu.width') v-bind('masu.width') v-bind('masu.width')
        v-bind('masu.width') v-bind('masu.width') v-bind('masu.width') v-bind(
          'masu.width'
        )
        v-bind('masu.width') v-bind('masu.width');
      border-left: 1px solid rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      > .masu {
        border-right: 1px solid rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      }
    }
    > .edge {
      content: '';
      position: absolute;
      background-color: rgba(#000, 0.5);
      mix-blend-mode: overlay;
      &:nth-of-type(2) {
        top: 0;
        left: 0;
        width: 10px;
        height: calc(100% - 10px);
      }
      &:nth-of-type(3) {
        top: 0;
        left: 10px;
        width: calc(100% - 10px);
        height: 10px;
      }
      &:nth-of-type(4) {
        top: 10px;
        right: 0;
        width: 10px;
        height: calc(100% - 10px);
      }
      &:nth-of-type(5) {
        bottom: 0;
        right: 10px;
        width: calc(100% - 10px);
        height: 10px;
      }
    }
  }
</style>
