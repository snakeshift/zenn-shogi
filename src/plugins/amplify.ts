import awsConfig from '../aws-exports'
import { Amplify } from '@aws-amplify/core'

export default defineNuxtPlugin((nuxtApp) => {
  Amplify.configure(awsConfig)
})
