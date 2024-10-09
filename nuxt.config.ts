// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['nuxt-mongoose', '@nuxt/ui'],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options:
        {}
    ,
    modelsDir: 'models',
    devtools:
        true,
  },
  runtimeConfig: {
    accessToken: '',
    pass: '',
  },
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0'
    }
  }
})