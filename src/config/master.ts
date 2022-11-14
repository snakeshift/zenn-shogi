import img_0 from '@/assets/images/shogi/piece/0.png'
import img_1 from '@/assets/images/shogi/piece/1.png'
import img_2 from '@/assets/images/shogi/piece/2.png'
import img_3 from '@/assets/images/shogi/piece/3.png'
import img_4 from '@/assets/images/shogi/piece/4.png'
import img_5 from '@/assets/images/shogi/piece/5.png'
import img_6 from '@/assets/images/shogi/piece/6.png'
import img_7_1 from '@/assets/images/shogi/piece/7_1.png'
import img_7_2 from '@/assets/images/shogi/piece/7_2.png'
import img_8 from '@/assets/images/shogi/piece/8.png'
import img_9 from '@/assets/images/shogi/piece/9.png'
import img_10 from '@/assets/images/shogi/piece/10.png'
import img_11 from '@/assets/images/shogi/piece/11.png'
import img_12 from '@/assets/images/shogi/piece/12.png'
import img_13 from '@/assets/images/shogi/piece/13.png'

export type Piece = {
  position: number
  koma: typeof KOMA[keyof typeof KOMA]
  komaImg: string
  teban: Teban
  isNari: boolean
  isOwn: boolean
} | null

export type Masu = {
  position: number
  piece: Piece
}

export type Koma = typeof KOMA[keyof typeof KOMA]
export type Teban = typeof TEBAN[keyof typeof TEBAN]

export type Board = Masu[][]
export type FlattenBoard = Record<number, Piece>

export type SfenStr = keyof typeof SFEN_TO_KOMA

export const TEBAN = {
  SENTE: 'b',
  GOTE: 'w',
} as const

export const POINTS: number[][] = [
  [91, 81, 71, 61, 51, 41, 31, 21, 11],
  [92, 82, 72, 62, 52, 42, 32, 22, 12],
  [93, 83, 73, 63, 53, 43, 33, 23, 13],
  [94, 84, 74, 64, 54, 44, 34, 24, 14],
  [95, 85, 75, 65, 55, 45, 35, 25, 15],
  [96, 86, 76, 66, 56, 46, 36, 26, 16],
  [97, 87, 77, 67, 57, 47, 37, 27, 17],
  [98, 88, 78, 68, 58, 48, 38, 28, 18],
  [99, 89, 79, 69, 59, 49, 39, 29, 19],
]

export const KEEP_OUT: readonly number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101,
  102, 103, 104, 105, 106, 107, 108, 109, 110,
]

export const DIRECTION: readonly number[] = [
  10, //←
  11, //←↓
  1, //↓
  -9, //→↓
  -10, //→
  -11, //→↑
  -1, //↑
  9, //←↑
  -12, //桂馬右飛び
  8, //桂馬左飛び
]

/* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
export const CAN_GO: readonly number[][] = [
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

/* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
export const CAN_JUMP: readonly number[][] = [
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const KOMA = {
  HU: 0,
  KY: 1,
  KE: 2,
  GI: 3,
  KI: 4,
  KA: 5,
  HI: 6,
  OU: 7,
  NHU: 8,
  NKY: 9,
  NKE: 10,
  NGI: 11,
  NKA: 12,
  NHI: 13,
} as const

export const SFEN_TO_KOMA = {
  P: KOMA.HU,
  p: KOMA.HU,
  '+P': KOMA.NHU,
  '+p': KOMA.NHU,
  L: KOMA.KY,
  l: KOMA.KY,
  '+L': KOMA.NKY,
  '+l': KOMA.NKY,
  N: KOMA.KE,
  n: KOMA.KE,
  '+N': KOMA.NKE,
  '+n': KOMA.NKE,
  S: KOMA.GI,
  s: KOMA.GI,
  '+S': KOMA.NGI,
  '+s': KOMA.NGI,
  G: KOMA.KI,
  g: KOMA.KI,
  B: KOMA.KA,
  b: KOMA.KA,
  '+B': KOMA.NKA,
  '+b': KOMA.NKA,
  R: KOMA.HI,
  r: KOMA.HI,
  '+R': KOMA.NHI,
  '+r': KOMA.NHI,
  K: KOMA.OU,
  k: KOMA.OU,
} as const

export const KOMA_TO_SFEN = {
  [TEBAN.SENTE]: {
    [KOMA.HU]: 'P',
    [KOMA.NHU]: '+P',
    [KOMA.KY]: 'L',
    [KOMA.NKY]: '+L',
    [KOMA.KE]: 'N',
    [KOMA.NKE]: '+N',
    [KOMA.GI]: 'S',
    [KOMA.NGI]: '+S',
    [KOMA.KI]: 'G',
    [KOMA.KA]: 'B',
    [KOMA.NKA]: '+B',
    [KOMA.HI]: 'R',
    [KOMA.NHI]: '+R',
    [KOMA.OU]: 'K',
  },
  [TEBAN.GOTE]: {
    [KOMA.HU]: 'p',
    [KOMA.NHU]: '+p',
    [KOMA.KY]: 'l',
    [KOMA.NKY]: '+l',
    [KOMA.KE]: 'n',
    [KOMA.NKE]: '+n',
    [KOMA.GI]: 's',
    [KOMA.NGI]: '+s',
    [KOMA.KI]: 'g',
    [KOMA.KA]: 'b',
    [KOMA.NKA]: '+b',
    [KOMA.HI]: 'r',
    [KOMA.NHI]: '+r',
    [KOMA.OU]: 'k',
  },
} as const

export const SFEN_TO_KOMA_IMAGE = {
  P: img_0,
  p: img_0,
  '+P': img_8,
  '+p': img_8,
  L: img_1,
  l: img_1,
  '+L': img_9,
  '+l': img_9,
  N: img_2,
  n: img_2,
  '+N': img_10,
  '+n': img_10,
  S: img_3,
  s: img_3,
  '+S': img_11,
  '+s': img_11,
  G: img_4,
  g: img_4,
  B: img_5,
  b: img_5,
  '+B': img_12,
  '+b': img_12,
  R: img_6,
  r: img_6,
  '+R': img_13,
  '+r': img_13,
  K: img_7_1,
  k: img_7_2,
} as const

export const SFEN_TO_TEBAN = {
  P: TEBAN.SENTE,
  p: TEBAN.GOTE,
  '+P': TEBAN.SENTE,
  '+p': TEBAN.GOTE,
  L: TEBAN.SENTE,
  l: TEBAN.GOTE,
  '+L': TEBAN.SENTE,
  '+l': TEBAN.GOTE,
  N: TEBAN.SENTE,
  n: TEBAN.GOTE,
  '+N': TEBAN.SENTE,
  '+n': TEBAN.GOTE,
  S: TEBAN.SENTE,
  s: TEBAN.GOTE,
  '+S': TEBAN.SENTE,
  '+s': TEBAN.GOTE,
  G: TEBAN.SENTE,
  g: TEBAN.GOTE,
  B: TEBAN.SENTE,
  b: TEBAN.GOTE,
  '+B': TEBAN.SENTE,
  '+b': TEBAN.GOTE,
  R: TEBAN.SENTE,
  r: TEBAN.GOTE,
  '+R': TEBAN.SENTE,
  '+r': TEBAN.GOTE,
  K: TEBAN.SENTE,
  k: TEBAN.GOTE,
} as const

export const SFEN_TO_IS_NARI = {
  P: false,
  p: false,
  '+P': true,
  '+p': true,
  L: false,
  l: false,
  '+L': true,
  '+l': true,
  N: false,
  n: false,
  '+N': true,
  '+n': true,
  S: false,
  s: false,
  '+S': true,
  '+s': true,
  G: false,
  g: false,
  B: false,
  b: false,
  '+B': true,
  '+b': true,
  R: false,
  r: false,
  '+R': true,
  '+r': true,
  K: false,
  k: false,
} as const

export const INITIAL_SFEN =
  'position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves'
