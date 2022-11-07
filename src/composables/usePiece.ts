import { useBoard } from './useBoard'
import {
  KOMA,
  SFEN_TO_KOMA,
  SFEN_TO_IS_NARI,
  TEBAN,
  KEEP_OUT,
  DIRECTION,
  CAN_GO,
  CAN_JUMP,
  Piece,
  Board,
} from '@/config/master'

export const usePiece = ({ piece }: { piece: Piece }) => {
  const { gameState } = useGame()
  const { flattenBoard } = useBoard()

  // 移動可能範囲
  const moveArea = computed(() => {
    const result: number[] = []

    if (!piece) return result

    const { position, koma, teban } = piece

    // 後手だったらDirectionの中身に-1をかける
    const direction = DIRECTION.map((value) => {
      return teban === TEBAN.GOTE ? value * -1 : value
    })

    // 移動先
    let movePos = null

    // 全移動方向に対して行けるか行けないか判断
    for (const i in direction) {
      // [i]方向に移動不可能な駒であればスキップ
      if (!CAN_GO[i][koma]) continue

      // 移動先の位置をセット
      movePos = position + direction[i]

      // 移動先に自駒がある場合はスキップ
      if (flattenBoard.value[movePos]?.teban === piece.teban) continue

      // 移動禁止エリアに入っている場合はスキップ
      if (KEEP_OUT.includes(movePos)) continue

      // 移動先を移動可能範囲にセット
      result.push(movePos)

      // [i]方向にジャンプ不可能な駒であればスキップ
      if (!CAN_JUMP[i][koma]) continue

      // 移動先に(敵)駒がある場合はスキップ
      if (flattenBoard.value[movePos]) continue

      const jump = (movePos: number) => {
        // ジャンプ先の位置をセット
        movePos = movePos + direction[i]

        // 移動先に自駒がある場合はループを抜ける
        if (flattenBoard.value[movePos]?.teban === piece.teban) return

        // 移動禁止エリアに入っている場合はループを抜ける
        if (KEEP_OUT.includes(movePos)) return

        // 移動先を移動可能範囲にセット
        result.push(movePos)

        // 移動先に(敵)駒がある場合はループを抜ける
        if (flattenBoard.value[movePos]) return

        jump(movePos)
      }

      jump(movePos)
    }

    return result
  })

  // 選択中の駒であるかどうか
  const isSelected = computed(() => {
    return gameState.value.selectedPiece?.position === piece?.position
  })

  return {
    isSelected,
    moveArea,
  }
}
