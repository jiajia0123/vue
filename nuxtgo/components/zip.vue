<template>
  <div>
    <ZipSon v-model="idex" :option="city" />
    <ZipSon v-model="idex2" :option="area" />
    郵遞區號:{{ zipcode }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import zipSon from '~/components/zipSon.vue'
@Component({
  components: { zipSon },
})
export default class zip extends Vue {
  idex: number = 0
  idex2: number = 0
  city: any = [
    {
      districts: [
        {
          zip: '100',
          name: '中正區',
        },
        {
          zip: '103',
          name: '大同區',
        },
        {
          zip: '104',
          name: '中山區',
        },
        {
          zip: '105',
          name: '松山區',
        },
        {
          zip: '106',
          name: '大安區',
        },
        {
          zip: '108',
          name: '萬華區',
        },
        {
          zip: '110',
          name: '信義區',
        },
        {
          zip: '111',
          name: '士林區',
        },
        {
          zip: '112',
          name: '北投區',
        },
        {
          zip: '114',
          name: '內湖區',
        },
        {
          zip: '115',
          name: '南港區',
        },
        {
          zip: '116',
          name: '文山區',
        },
      ],
      name: '臺北市',
    },
    {
      districts: [
        {
          zip: '200',
          name: '仁愛區',
        },
        {
          zip: '201',
          name: '信義區',
        },
        {
          zip: '202',
          name: '中正區',
        },
        {
          zip: '203',
          name: '中山區',
        },
        {
          zip: '204',
          name: '安樂區',
        },
        {
          zip: '205',
          name: '暖暖區',
        },
        {
          zip: '206',
          name: '七堵區',
        },
      ],
      name: '基隆市',
    },
    {
      districts: [
        {
          zip: '207',
          name: '萬里區',
        },
        {
          zip: '208',
          name: '金山區',
        },
        {
          zip: '220',
          name: '板橋區',
        },
        {
          zip: '221',
          name: '汐止區',
        },
        {
          zip: '222',
          name: '深坑區',
        },
        {
          zip: '223',
          name: '石碇區',
        },
        {
          zip: '224',
          name: '瑞芳區',
        },
      ],
      name: '新北市',
    },
  ]

  get area() {
    return this.city[this.idex].districts
  }

  get zipcode() {
    return this.city[this.idex].districts[this.idex2].zip
  }

  @Watch('idex')
  re() {
    this.idex2 = 0
  }
}
</script>
