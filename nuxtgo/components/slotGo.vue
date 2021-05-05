<template>
  <div>
    <slot name="one" :goto="msg2" :goto2="msg3">預設1</slot>
    <slot name="two" :goto="msg2" :goto2="msg3">預設2</slot>
    <slot name="three">預設3</slot>
    <slot name="four">預設4</slot>
    <slot></slot>
    <p>{{ msg }}</p>
    <p>outgo1</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class AddTourist2 extends Vue {
  msg: string = '我是子'
  msg2: string = '我是子我想傳給父'
  msg3: string = '哈哈我是子，我想傳給父3'
}
</script>
