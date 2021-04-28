<template>
  <div>
    <div class="banner">
      <h1 class="bigtitle">{{ $t('title') }}</h1>
      <select id="sel" name="" :value="value" @change="emitDistrictsZip">
        <option
          v-for="site in districtsCodeArry"
          :key="site.zip"
          :value="site.zip"
        >
          {{ site.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface AreaOption {
  zip: number
  name: string
}

@Component
export default class SelectZip extends Vue {
  /** 郵遞區號陣列 */
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry!: AreaOption[]

  /** 上層傳來郵遞區號(數字) */
  @Prop({ type: [String], default: null })
  value!: string

  /** 發出事件-郵遞區號(數字) */
  emitDistrictsZip(event: any) {
    this.$emit('input', event.target.value)
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
