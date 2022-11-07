import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { useShogiStore } from '@/store/shogi'

export const useMasu = (position?: number) => {
  const shogiStore = useShogiStore()
  const { width } = useWindowSize({ includeScrollbar: false })
  const { gameState } = useGame()
  const { board, flattenBoard, boardToSfen, updateBoard } = useBoard()
  const { state } = storeToRefs(shogiStore)

  // マスが暗い状態かどうか
  const isDark = computed(() => {
    if (!position) return false
    if (!gameState.value.selectedPiece) return false
    if (gameState.value.selectedPiece.position === position) return true

    const { moveArea } = usePiece({ piece: gameState.value.selectedPiece })
    return !moveArea.value.includes(position)
  })

  const selectMasu = () => {
    if (!position) return

    // 選択中の駒が無ければgameStateに追加
    if (!gameState.value.selectedPiece) {
      gameState.value.selectedPiece = flattenBoard.value[position]
      return
    }

    const { moveArea } = usePiece({ piece: gameState.value.selectedPiece })

    // 移動可能エリア内であれば
    if (moveArea.value.includes(position)) {
      updateBoard({ position })
    }

    // 選択中の駒をリセット
    gameState.value.selectedPiece = null
    return
  }

  // マスの大きさ
  const masu = computed(() => {
    const minWidth = width.value <= 500 ? width.value : 500
    const baseSize = minWidth / 9
    return {
      width: `${baseSize * 0.915}px`,
      height: `${baseSize}px`,
    }
  })

  return {
    masu,
    isDark,
    selectMasu,
  }
}
