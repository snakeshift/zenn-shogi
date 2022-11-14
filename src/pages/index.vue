<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'slide',
    },
  })

  const authStore = useAuthStore()
  const shogiStore = useShogiStore()
  const { signInAnonymously } = authStore
  const { auth, isSignedIn } = storeToRefs(authStore)
  const { searchMatchingRoom, createMatchingRoom } = shogiStore

  const isLoading = ref(false)
  const router = useRouter()

  // const hoge = await getCurrentUser()

  const search = async () => {
    isLoading.value = true
    await signInAnonymously()
    if (!isSignedIn.value) {
      isLoading.value = false
      return
    }
    // await createMatchingRoom()
    await searchMatchingRoom()
    // await createMatchingRoom()
    // const room = await searchRoom()
    // console.log(room)

    // router.push({ name: 'game' })
  }
</script>

<template>
  <div class="page-index">
    <h1 class="title">
      <span class="sub">
        オンライン将棋を作りながら学ぶ
        <div class="logo">
          <img src="@/assets/images/logo/nuxt.svg" class="nuxt" />
          <img src="@/assets/images/logo/amplify.svg" class="amplify" />
        </div>
      </span>
      <span class="strong">N</span>uxt3 × Amplify
    </h1>
    <div class="content">
      <BaseButton
        color="#41B883"
        class="button"
        :loading="isLoading"
        @click="search"
      >
        マッチング ぽちっ
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-index {
    height: 100%;
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'tsukushi';
    > .title {
      font-size: 2.4rem;
      margin-top: 0;
      text-align: left;
      letter-spacing: 3px;
      line-height: 38px;
      margin-left: 25px;
      > .sub {
        font-size: 1.3rem;
        display: block;
        letter-spacing: 0;
        position: relative;
        > .logo {
          position: absolute;
          display: flex;
          width: 30px;
          height: 30px;
          top: -15px;
          right: 15px;
          > .nuxt {
            transform-origin: center bottom;
            animation: yurayura1 3s linear infinite;
            @keyframes yurayura1 {
              0%,
              100% {
                transform: rotate(0deg) scale(1);
              }
              50% {
                transform: rotate(10deg) scale(1.1);
              }
            }
          }
          > .amplify {
            width: 23px;
            height: 23px;
            z-index: 2;
            transform-origin: center bottom;
            animation: yurayura2 2s linear infinite;
            @keyframes yurayura2 {
              0%,
              100% {
                transform: rotate(30deg) translateX(-5px) translateY(10px)
                  scale(1);
              }
              50% {
                transform: rotate(20deg) translateX(-5px) translateY(10px)
                  scale(1.1);
              }
            }
          }
        }
      }
      > .strong {
        font-size: 3.2rem;
        padding-bottom: 2px;
        border-bottom: 3px solid;
        color: #63acb7;
      }
    }

    > .content {
      display: flex;
      align-items: center;
      > .button {
        :deep(.el-button) {
          color: #fff;
        }
      }
    }
  }
</style>
