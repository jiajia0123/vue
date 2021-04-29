<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
      rules="positive|min:2,3"
      :bails="false"
    >
      <input v-model="value" type="text" />
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </ValidationProvider>
    <br />
    必須是在'東區','西區','北區' 其中之一
    <ValidationProvider v-slot="{ errors }" rules="x:東區,西區,北區">
      <input id="email2" v-model="value2" name="email" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    <br />
    必填
    <ValidationProvider v-slot="{ errors }" rules="must">
      <input v-model="value2" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <br />
    群組選項<br />
    <ValidationObserver ref="form">
      <ValidationProvider v-slot="{ errors, failed }" name="a1" rules="email">
        <input v-model="value2" :class="`is-${failed}`" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <ValidationProvider v-slot="{ errors, failed }" name="a2" rules="email">
        <input v-model="value3" :class="`is-${failed}`" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <ValidationProvider v-slot="{ errors, failed }" name="a3" rules="email">
        <input v-model="value4" :class="`is-${failed}`" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <button @click="onSubmit">送出</button>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { email } from 'vee-validate/dist/rules'

extend('positive', (value) => {
  return value >= 100 ? '' : '必須大於100'
})

extend('min', {
  validate(value, { min, max }: any) {
    return value.length >= min && value.length <= max
      ? ''
      : '長度必須{min}~{max}喔!'
  },
  params: ['min', 'max'],
})

extend('x', (value, values) => {
  return values.includes(value)
    ? ''
    : '{_field_}{_value_}{_rule_}你必須輸入{東區或西區或北區}'
})

extend('must', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    }
  },
  message: '你沒有填資料',
  computesRequired: true,
})

extend('tel', {
  validate: (value) => {
    return value.length > 3
  },
  message: '你的電話長度過短',
})

extend('email', {
  ...email,
  message: '必須為email格式',
  computesRequired: true,
})

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Vee extends Vue {
  value?: number | string = 0
  value2: number | string = ''
  value3: number | string = ''
  value4: number | string = ''

  /** typescipt要加這段 */
  $refs!: {
    form: InstanceType<typeof ValidationObserver>
  }

  onSubmit() {
    this.$refs.form.validate().then((success) => {
      if (!success) {
        return
      }

      alert('成功囉')

      this.value2 = this.value3 = this.value4 = 0

      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
input.is-true {
  outline: solid 1px #ff0f0f;
}
</style>
