<script setup lang="ts">
  import { Authenticator } from '@aws-amplify/ui-vue'
  import '@aws-amplify/ui-vue/styles.css'

  definePageMeta({
    name: 'ログイン',
  })
</script>

<template>
  <div class="page-login">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<style lang="scss" scoped>
  .page-login {
    margin-top: 40px;
  }
</style>
