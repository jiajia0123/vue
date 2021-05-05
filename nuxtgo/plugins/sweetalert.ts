import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default (context: Context, inject: Inject) => {
  inject(
    'swal',
    (
      title: string = '完成',
      text: string,
      icon: string,
      confirmButtonText: string
    ) =>
      Swal.fire({
        title,
        text: '資料更新成功',
        icon: 'success',
        confirmButtonText: '確認',
      })
  )
}
