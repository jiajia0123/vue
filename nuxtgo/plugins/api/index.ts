import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default (context: Context, inject: Inject) => {
  const instance = context.$axios.create({
    baseURL: `${process.env.API_URL}`,
  })

  inject('api', instance)
}
