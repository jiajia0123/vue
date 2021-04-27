import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
extend('required', {
  ...required,
  message: '此為必填欄位哦',
  computesRequired: true,
})

extend('tel', {
  validate: (value) => {
    return value.length > 5
  },
  message: '你的電話長度過短',
})
