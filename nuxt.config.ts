// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui','nuxt-mongoose','./modules/auth.module','nuxt-vue3-google-signin'],
  googleSignIn: {
    clientId: '44678613954-1iv2ppns1kiosof9nkgdnr3orp3nbor4.apps.googleusercontent.com',
  },
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
    public: {
      clientId: ''
    }
  },
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0'
    }
  }
})