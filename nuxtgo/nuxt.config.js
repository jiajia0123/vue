export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: '0.0.0.0',
  },
  head: {
    title: 'nuxtgo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/hello',
    '~/plugins/Notifications',
    '~/plugins/VeeValidate',
    '~/plugins/Loading',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', 'nuxt-i18n'],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: '英文版',
      },
      {
        code: 'zw',
        iso: 'zw-tw22',
        name: '中文版',
      },
    ],
    defaultLocale: 'zw',
    vueI18n: {
      fallbackLocale: 'zw',
      messages: {
        en: {
          welcome: 'Welcome',
          about: 'About us',
          title: 'Taichung Attractions Information-Vue',
          tName: 'Attraction',
          tArea: 'ZipRegions',
          tAddr: 'Address',
          tPhone: 'phone',
          tAdd: 'Add',
          error: 'error',
          success: 'success',
          del: 'delete',
          mod: 'modify',
          re: 'Update|Refresh',
        },
        zw: {
          welcome: '歡迎',
          about: '關於我們',
          title: '台中景點資訊-Vue',
          tName: '景點名稱',
          tArea: '行政區域',
          tAddr: '地址',
          tPhone: '電話',
          tAdd: '新增',
          error: '錯誤',
          success: '成功',
          del: '刪除',
          mod: '修改',
          re: '重整|更新',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    extend() {
      // ...
    },
  },
}
