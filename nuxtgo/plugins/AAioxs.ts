import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import axios from "axios";

export default (_: Context, inject: Inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("AAxios_POST", (txt2: string) => console.log("你好嗎" + txt2));
  inject("AAxios", (txt: string) => axios.get(txt));
};

declare module 'vue/types/vue' {
  interface Vue {
    $AAxios_POST(message: string): Promise<any>
    $AAxios(message: string): Promise<any>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $AAxios_POST(message: string): Promise<any>
    $AAxios(message: string): Promise<any>
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $AAxios_POST(message: string): Promise<any>
    $AAxios(message: string): Promise<any>
  }
}
