// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', ],
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