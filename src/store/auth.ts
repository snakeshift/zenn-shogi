import { defineStore } from 'pinia'
import { Auth } from '@aws-amplify/auth'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('Auth', () => {
  /**
   * States
   * 値更新の単一方向性を担保するためreturn厳禁
   */

  const state = reactive({
    auth: useLocalStorage('auth', {
      username: '',
    }),
  })

  /**
   * Getters
   * 意図せぬ更新を防ぐため参照する際はGettersを使う
   */

  const auth = computed(() => state.auth)
  const isSignedIn = computed(() => !!state.auth.username)

  /**
   * Actions
   * 値の更新は全てActions内に含める
   */

  // 認証情報取得
  const getCurrentUser = async () => {
    return await Auth.currentAuthenticatedUser()
      .then(({ username }) => {
        state.auth.username = username
        return true
      })
      .catch((err) => {
        console.log(err)
        // ローカルストレージ上は保持していても認証期限が切れている場合があるので消しておく
        state.auth.username = ''
        return false
      })
  }

  // 匿名認証
  const signInAnonymously = async () => {
    if (isSignedIn.value) return true

    const email = `${Date.now()}@example.com`
    const password = 'Password'

    await Auth.signUp(email, password)
    return await Auth.signIn(email, password)
      .then(({ username }) => {
        state.auth.username = username
        return true
      })
      .catch(() => false)
  }

  return {
    auth,
    isSignedIn,
    getCurrentUser,
    signInAnonymously,
  }
})
