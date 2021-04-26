import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module 'vue/types/vue' {
  interface Vue {
    $hello: NuxtAxiosInstance
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $hello: NuxtAxiosInstance
  }
  interface Context {
    $hello: NuxtAxiosInstance
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $hello: NuxtAxiosInstance
  }
  interface Context {
    $hello: NuxtAxiosInstance
  }
}
