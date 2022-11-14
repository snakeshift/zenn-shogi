import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { INITIAL_SFEN } from '@/config/master'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { createRoom } from '@/graphql/mutations'
import { listRooms, getRoom } from '@/graphql/queries'
import {
  ListRoomsQuery,
  CreateRoomInput,
  GetRoomQueryVariables,
  GetRoomQuery,
} from '@/API'

export const useShogiStore = defineStore('Shogi', () => {
  /**
   * States
   * 値更新の単一方向性を担保するためreturn厳禁
   */

  const state = reactive({
    sfen: INITIAL_SFEN,
    player: null,
    enemy: null,
  })

  /**
   * Getters
   * 意図せぬ更新を防ぐため参照する際はGettersを使う
   */

  // USIプロトコル (position sfen ${position} ${teban} ${captured/-} ${count} moves ${move1} ${move2} ... ${moven})
  const sfen = computed(() => {
    const sfenArr = state.sfen.split(' ')
    return {
      all: state.sfen,
      position: sfenArr[2],
      teban: sfenArr[3],
      captured: sfenArr[4],
      count: sfenArr[5],
      moves: sfenArr.slice(7),
    }
  })

  /**
   * Actions
   * 値の更新は全てActions内に含める
   */

  // 対局ルームを探す
  const searchMatchingRoom = async () => {
    const rooms = (await API.graphql(
      graphqlOperation(listRooms, {
        filter: {
          or: [{ sente: { eq: 'aaa' } }, { gote: { eq: 'bbb' } }],
        },
      })
    )) as GraphQLResult<ListRoomsQuery>
  }

  // 対局ルームを作る
  const createMatchingRoom = async () => {
    const result = (await API.graphql(
      graphqlOperation(createRoom, {
        input: {
          gote: 'bbb',
        },
      })
    )) as GraphQLResult<CreateRoomInput>
  }

  const setSfen = async (sfen: string) => {
    // 通信する
    state.sfen = sfen
  }

  return {
    sfen,
    searchMatchingRoom,
    createMatchingRoom,
    setSfen,
  }
})
