import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default (context: Context, inject: Inject) => {
  inject('hello', (msg) => console.log(`Hello ${msg}!`))
}
