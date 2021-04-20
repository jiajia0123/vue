<template>
  <div>
    <select name="" id="sel" v-model="prop_districtsZip" @change="input_districtsZip">
      <option
        :value="site.zip"
        v-for="site in districtsCodeArry"
        :key="site.zip"
      >
        {{ site.name }}

      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
interface AreaOption {
  zip: number;
  name: string;
}

@Component({})
export default class select_zip extends Vue {
  /**郵遞區號陣列 */
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry?: AreaOption[];

  @Prop({ type: [Number,String], default: null })
  value?: number|string;

  prop_districtsZip=this.value
  input_districtsZip() {
    this.$emit('input',this.prop_districtsZip)
  }
}
</script>
