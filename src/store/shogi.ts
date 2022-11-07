import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { INITIAL_SFEN } from '@/config/master'

export const useShogiStore = defineStore('Shogi', () => {
  /**
   * States
   * 値更新の単一方向性を担保するためreturn厳禁
   */

  const state = reactive({
    sfen: INITIAL_SFEN,
  })

  /**
   * Getters
   * 意図せぬ更新を防ぐため参照する際はGettersを使う
   */

  const sfen = computed(() => state.sfen)

  /**
   * Actions
   * 値の更新は全てActions内に含める
   */

  const someFunction = async () => {}

  return {
    state,
    sfen,
    someFunction,
  }
})
