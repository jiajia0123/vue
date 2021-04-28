<template>
  <div id="app">
    <!-- <Vee />測試vee表單驗證 -->
    <!-- <Loading /> 測試loading方法1
     <Loading2 />測試loading方法2 -->

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

    <Card v-model="touristDestination" />

    <!-- <div >爺孫組件測試<TestFather v-model="districtsZip"/></div> -->

    <div class="footer">
      <p>由原始javascrip版本改成Vue框架、axios使用</p>

      <p>
        <a target="_blank" href="https://jiajia0123.github.io/mywork/index.htm"
          >進入原始javascrip版本</a
        >
      </p>
    </div>

    <!-- <todo :merr="mey">這是父組件插曹</todo> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { LocaleObject } from 'nuxt-i18n/types'
import { AreaOption, touristOption } from '~/@types'
import SelectZip from '~/components/selectZip.vue'
import AddTourist from '~/components/addTourist.vue'
import Card from '~/components/card.vue'
import TestFather from '~/components/testFather.vue'
import Vee from '~/components/vee.vue'
import Loading from '~/components/loading.vue'
import Loading2 from '~/components/loading2.vue'

@Component({
  components: {
    SelectZip,
    AddTourist,
    Card,
    TestFather,
    Vee,
    Loading,
    Loading2,
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
