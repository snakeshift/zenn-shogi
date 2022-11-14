import { Piece, Teban, TEBAN } from '@/config/master'

interface GameState {
  player: Teban
  teban: Teban
  selectedPiece: Piece
}

export const useGame = () => {
  // ゲームの状態を保持
  const gameState = useState<GameState>('gameState', () => ({
    player: TEBAN.SENTE,
    teban: TEBAN.SENTE,
    selectedPiece: null,
  }))

  return {
    gameState,
  }
}
