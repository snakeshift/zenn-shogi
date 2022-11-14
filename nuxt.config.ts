import unpluginVueDefineOptions from 'unplugin-vue-define-options/vite'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
    strict: true,
  },
  srcDir: 'src/',
  css: ['@/assets/styles/index.scss'],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['storeToRefs'],
      },
    ],
  ],
  imports: {
    dirs: ['./store'],
  },
  app: {
    pageTransition: {
      name: 'slide',
      mode: 'out-in',
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
      'window.global': {},
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/variable.scss";
          `,
        },
      },
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
    plugins: [unpluginVueDefineOptions()],
  },
})
