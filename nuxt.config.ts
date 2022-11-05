// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  modules: ['@pinia/nuxt'],
  vite: {
    define: {
      'process.env.DEBUG': false,
      'window.global': {},
    },
    css: {
      preprocessorOptions: {
        // scss: {
        //   additionalData: `
        //     @import "@/assets/styles/variable.scss";
        //   `,
        // },
      },
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
    // plugins: [unpluginVueDefineOptions()],
  },
})
