import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default (context: Context, inject: Inject) => {
  const instance = context.$axios.create({
    baseURL: `${process.env.API_URL}`,
  })

  // 此處的instance為我們create的實體
  instance.interceptors.request.use(
    function (config) {
      console.log('攔截器成功')

      return config
    },
    function (error) {
      console.log('你失敗了')

      return Promise.reject(error)
    }
  )

  inject('api', instance)
}
