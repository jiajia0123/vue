<template>
  <div>
    {{ merr }}
    <br />
    {{ me2 }}
    <input type="text" v-model="textbar" />
    新值:{{ newvalue }}<br />
    舊值{{ oldvalue }}
    <button @click="gm">按鈕</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class haha extends Vue {
  //data
  textbar: any = "123";
  newvalue:string="123"
  oldvalue:string="123"
  //props寫法
  @Prop({ type: [Number], default: "這是預設" })
  merr?: string;

  //computed寫法
  get me2() {
    return this.merr + "哈哈";
  }

  //methods寫法
  gm() {
    this.merr = "悾悾悾";
  }

  //mounted寫法
  mounted() {
    console.log(typeof this.me2);
  }

  @Watch("textbar")
  add(nevalue: string, old: string) {}
}
</script>
