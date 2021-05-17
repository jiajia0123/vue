<template>
  <div>
    <select v-model="value">
      <option v-for="(item, idx) in option" :key="idx" :value="idx">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
@Component
export default class HelloWorld extends Vue {
  @Prop({ type: String })
  option!: []

  @Prop({ type: String })
  value!: []

  @Watch('value')
  go() {
    this.$emit('input', this.value)
  }
}
</script>
