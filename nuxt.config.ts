// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-01',
  devtools: false,

  css: [
    "bootstrap/dist/css/bootstrap.min.css"
  ],

  
  modules: [
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'nuxt-google-auth',
    
  ],

  googleAuth: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    autoLoadScript: true,
    promptOneTap: false
  },

  runtimeConfig: {

    session: {
      password: process.env.NUXT_SESSION_PASSWORD || ''
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        'bootstrap-vue-next',
        'bootstrap/dist/js/bootstrap.bundle.min.js' 
      ]
    }
  }

})
