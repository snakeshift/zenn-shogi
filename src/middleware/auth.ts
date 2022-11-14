const authStore = useAuthStore()
const { auth, isSignedIn } = storeToRefs(authStore)
const { getCurrentUser } = authStore

export default defineNuxtRouteMiddleware(async (to, from) => {
  // サインイン中でない場合はindexに飛ばす
  await getCurrentUser()
  if (!isSignedIn.value) return navigateTo('/')
})
