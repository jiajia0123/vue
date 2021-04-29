<template>
  <div>
    <input type="text" :value="value" @keyup.enter="gopre" /> -->
    {{ hago2 }}InjectReactive
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, InjectReactive } from 'nuxt-property-decorator'
// interface AreaOption {
//   zip: number
//   name: string
// }
@Component
export default class TestSon extends Vue {
  @InjectReactive()
  readonly hago2?: string

  @Prop({ type: String, default: null })
  value?: string

  gopre(e: any) {
    this.$emit('input', e.target.value)
  }
}
</script>
