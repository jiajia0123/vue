<template>
  <div>
    <div class="banner">
      <h1 class="bigtitle">台中景點資訊-Vue</h1>
      <select name="" id="sel" :value="value" @change="emitDistrictsZip">
        <option
          :value="site.zip"
          v-for="site in districtsCodeArry"
          :key="site.zip"
        >
          {{ site.name }}
        </option>
      </select>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface AreaOption {
  zip: number;
  name: string;
}

@Component
export default class SelectZip extends Vue {
  /**郵遞區號陣列 */
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry?: AreaOption[];

  @Prop({ type: [String], default: null })
  value?: string;

  emitDistrictsZip(event: any) {
    this.$emit("input", event.target.value);
  }
}
</script>

<style lang="scss" scoped>

.bigtitle {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 0;
  text-align: center;
  padding-top: 20px;
}
</style>
