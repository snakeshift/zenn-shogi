import { storeToRefs } from 'pinia'
import {
  POINTS,
  KOMA,
  TEBAN,
  KOMA_TO_SFEN,
  SFEN_TO_KOMA,
  SFEN_TO_KOMA_IMAGE,
  SFEN_TO_TEBAN,
  SFEN_TO_IS_NARI,
  Board,
  FlattenBoard,
  Piece,
  SfenStr,
} from '@/config/master'
import { useShogiStore } from '@/store/shogi'

export const useBoard = () => {
  const shogiStore = useShogiStore()
  const { sfen } = storeToRefs(shogiStore)
  const { gameState } = useGame()
  const { state } = storeToRefs(shogiStore)

  // sfen文字列を基にした二次元配列の盤面
  const board = computed<Board>(() => {
    return sfenToBoard(sfen.value)
  })

  // positionをキーにした盤面
  const flattenBoard = computed(() => {
    return board.value
      .flat()
      .reduce(
        (result, masu) => ({ ...result, [masu.position]: masu.piece }),
        {}
      ) as FlattenBoard
  })

  // sfen文字列からBoard配列への変換
  const sfenToBoard = (sfen: string) => {
    return sfen
      .split('/')
      .map((danStr) => {
        let sfenStr = ''
        const danArr: SfenStr[] = []
        ;[...danStr].forEach((str) => {
          sfenStr += str
          if (sfenStr === '+') return
          if (!isNaN(parseInt(sfenStr))) {
            danArr.push(...Array(Number(sfenStr)).fill(''))
            sfenStr = ''
            return
          }
          danArr.push(sfenStr as SfenStr)
          sfenStr = ''
        })
        return danArr
      })
      .map((danArr, danIndex) => {
        return danArr.map((str, index) => {
          const position = POINTS[danIndex][index]
          const piece =
            (str && {
              position,
              koma: SFEN_TO_KOMA[str],
              komaImg: SFEN_TO_KOMA_IMAGE[str],
              teban: SFEN_TO_TEBAN[str],
              isNari: SFEN_TO_IS_NARI[str],
              isOwn: SFEN_TO_TEBAN[str] === gameState.value.player,
            }) ||
            null

          return {
            position,
            piece,
          }
        })
      })
  }

  // Board配列からsfen文字列への変換
  const boardToSfen = (board: Board) => {
    return board
      .map((dan) => {
        let emptyCount = 0
        let sfen = ''

        dan
          .map((masu) => {
            return masu.piece
              ? KOMA_TO_SFEN[masu.piece.teban][masu.piece.koma]
              : null
          })
          .forEach((sfenStr, index, sfenArr) => {
            if (!sfenStr) {
              emptyCount++
              if (index === sfenArr.length - 1) sfen += emptyCount
              return
            }
            if (emptyCount <= 0) {
              sfen += sfenStr
              return
            }
            sfen += emptyCount
            sfen += sfenStr
            emptyCount = 0
          })
        return sfen
      })
      .join('/')
  }

  // Board配列を更新
  const updateBoard = ({ position }: { position: number }) => {
    const newBoard = board.value.map((dan) => {
      const masuBefore = dan.find(
        (masu) => masu.position === gameState.value.selectedPiece?.position
      )
      const masuAfter = dan.find((masu) => masu.position === position)
      if (masuBefore?.piece) masuBefore.piece = null
      if (masuAfter) masuAfter.piece = gameState.value.selectedPiece
      return dan
    })

    state.value.sfen = boardToSfen(newBoard)
  }

  return {
    board,
    flattenBoard,
    sfenToBoard,
    boardToSfen,
    updateBoard,
  }
}
