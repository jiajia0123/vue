<template>
  <div id="app">
    <Toe />
    <!-- <Zip />重複組件練習 -->
    <!-- <Vee />測試vee表單驗證 -->
    <!-- <Loading /> 測試loading方法1
     <Loading2 />測試loading方法2 -->
    <!--插巢練習START -->

    <slotGo style="display: none">
      <!-- 2.動態切換具名插槽 -->
      <template #[threeOrfour]>
        <div>XXXXX</div>
      </template>

      <!-- 3.作用域插槽:子組件的資料往上傳="自訂義名稱" -->
      <template #two="gosd">
        <div>第二個父{{ gosd.goto }}</div>
        <div>第二個父{{ gosd.goto2 }}</div>
      </template>
      <!-- 1.具名插槽:v-slot:one，也可以寫成#one -->
      <!-- 4.解構插槽:子組件的資料往上傳="{解構需要的變數}" -->
      <template #one="{ goto }">
        <div>第一個父</div>
        <div>第一個父 {{ goto }}</div>
      </template>
      <br />
      ---------------
      <br />
      {{ msg }}
    </slotGo>
    <!--插巢練習END -->

    <multiselect
      v-model="value"
      style="margin: 30px; width: 800px"
      :options="options"
      placeholder="哈囉趕快選啦"
      track-by="language"
      label="name"
      :searchable="true"
      :close-on-select="true"
      :show-labels="false"
      :allow-empty="false"
      :custom-label="xxx"
      deselect-label="不能移除"
      :multiple="true"
      :internal-search="false"
      @search-change="goha"
    ></multiselect>
    {{ value }}
    <!-- track-by="language" 應該是key唯一值
          label="name"顯示在選單中的名稱(name是:options裡面的陣列的某個key值)
          :searchable="false" –禁用搜索功能
          :close-on-select="false" –選擇選項後，下拉菜單保持打開狀態
          :show-labels="false" –高亮顯示的選項上沒有標籤
          :allow-empty="false"允許空值
          :custom-label="xxx"，名稱用function，return一個新的標籤
         :multiple="true"複選
          :internal-search="false"複選的時候點選可以關掉它
         @search-change="goha" 輸入內容觸發的動作
         -->

    <div class="nuxtlinka">
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        >{{ locale.name }}</nuxt-link
      >
    </div>
    <div class="nuxtlinka" style="top: 22px">
      <a href="" @click.prevent="moveAbout">{{ $t('about') }}</a>
    </div>
    <SelectZip
      v-model="districtsZip"
      :districts-code-arry="districtsCodeArry"
    />

    <AddTourist
      :code="code"
      :districts-code-arry="districtsCodeArry"
      @reloadTouris="reloadTouris"
    />

    <h2 class="area_title">{{ districtsArea }}</h2>

    <Card ref="opengo" v-model="touristDestination" />

    <!-- <div >爺孫組件測試<TestFather v-model="districtsZip"/></div> -->

    <div class="footer">
      <p>由原始javascrip版本改成Vue框架、axios使用</p>

      <p>
        <a target="_blank" href="https://jiajia0123.github.io/mywork/index.htm"
          >進入原始javascrip版本</a
        >
      </p>
      <!-- <button @click="opengo.bark('123')">子組件的旺旺叫</button> ref測試-->
    </div>

    <!-- <todo :merr="mey">這是父組件插曹</todo> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'nuxt-property-decorator'
import { LocaleObject } from 'nuxt-i18n/types'

import multiselect from 'vue-multiselect'
import { AreaOption, touristOption } from '~/@types'
import SelectZip from '~/components/selectZip.vue'
import AddTourist from '~/components/addTourist.vue'
import Card from '~/components/card.vue'
import TestFather from '~/components/testFather.vue'
import Vee from '~/components/vee.vue'
import Loading from '~/components/loading.vue'
import Loading2 from '~/components/loading2.vue'
import slotGo from '~/components/slotGo.vue'
import Zip from '~/components/zip.vue'
import Toe from '~/components/toe.vue'
import 'sweetalert2/src/sweetalert2.scss'
@Component({
  components: {
    SelectZip,
    AddTourist,
    Card,
    TestFather,
    Vee,
    Loading,
    Loading2,
    slotGo,
    multiselect,
    Zip,
    Toe,
  },

  async asyncData({ $api }) {
    const cityarea = encodeURI('東區')
    /** 取得旅遊景點陣列touristDestination */
    const res = await $api.get(`/tourist?cityname=${cityarea}`)
    /** 取得郵遞區號陣列districtsCodeArry */
    const res2 = await $api.get(`/districts`)
    return {
      touristDestination: res.data,
      districtsCodeArry: res2.data,
    }
  },
})
export default class HelloWorld extends Vue {
  goha() {
    alert('不簡單!')
  }

  xxx({ name, language }) {
    if (name === '大王') {
      return '大王會中文是真的嗎'
    }
    return `${name}會[${language}]`
  }

  value = null
  options: object[] = [
    { name: '大王', language: '中文' },
    { name: '小花', language: '英文' },
    { name: '陳明', language: '德文' },
    { name: '小寮', language: '法文', $isDisabled: true },
    { name: '王橫', language: '西班牙文' },
  ]

  threeOrfour: string = 'three'
  msg: string = '我是父'
  /** 郵遞區號陣列 */
  districtsCodeArry: AreaOption[] = []

  /** 旅遊景點初始陣列 */
  touristDestination: touristOption[] = []

  /* 從子組件發來的事件->更新旅遊景點 */
  reloadTouris(val: touristOption[]) {
    this.touristDestination = val
  }

  /** 郵遞區號(綁定v-model) */
  districtsZip: string = '401'

  /** 郵遞區號所對應的地區名稱 */
  get districtsArea(): string {
    return (
      this.districtsCodeArry.find((item) => {
        return item.zip === this.districtsZip
      })?.name || '東區'
    )
  }

  /** 中英文切換 */
  get availableLocales() {
    return (this.$i18n.locales as LocaleObject[]).filter(
      (i) => i.code !== this.$i18n.locale
    )
  }

  /** 地區名稱轉成encodeURI */
  get code(): string {
    return encodeURI(this.districtsArea)
  }

  /** 地區名稱(districtsArea)改變，重新渲染資料 */
  @Watch('districtsArea')
  async apiGet() {
    const loader = this.$loading.show()
    const res = await this.$api.get(`/tourist?cityname=${this.code}`)
    this.touristDestination = res.data
    loader.hide()
  }

  moveAbout() {
    this.$router.push(this.localePath('/about'))
  }

  @Ref() readonly opengo!: Card // Card這個子組件上有一個ref="opengo"

  /** 爺孫組件測試 */
  // @ProvideReactive()
  // hago2: string = "5555";
}
</script>

<style lang="scss" scoped>
html,
body {
  padding: 0;
  font-family: '微軟正黑體';
}

.area_title {
  color: #634c9f;
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}

.nuxtlinka {
  display: block;
  position: absolute;
  right: 0;
  color: #fff;
  font-weight: bold;
  a {
    color: #fff;
    margin-right: 5px;
    display: inline-block;
    font-size: 1.125em;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
