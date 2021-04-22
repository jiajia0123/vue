<template>
  <div id="app">

    <!-- <vee />測試vee表單驗證 -->
    <selectZip :districtsCodeArry="districtsCodeArry" v-model="districtsZip" />

    <addTourist
      @reloadTouris="reloadTouris"
      :code="code"
      :districtsCodeArry="districtsCodeArry"
    />

    <h2 class="area_title">{{ districtsArea }}</h2>

    <card v-model="touristDestination" />

    <!-- <div >爺孫組件測試<testFather v-model="districtsZip"/></div> -->

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
import {
  Component,
  Prop,
  Vue,
  Watch,
  Provide,
  ProvideReactive
} from "vue-property-decorator";
import selectZip from "~/components/selectZip.vue";
import addTourist from "~/components/addTourist.vue";
import card from "~/components/card.vue";
import testFather from "~/components/testFather.vue";
import vee from "~/components/vee.vue";
interface AreaOption {
  zip: string;
  name: string;
}

@Component({
  components: {
    selectZip,
    addTourist,
    card,
    testFather,
    vee
  },

  /**取得郵遞區號陣列districtsCodeArry*/
  /**取得旅遊景點陣列touristDestination*/
  async asyncData({ $axios }) {
    console.log("你好嗎");
    const cityarea = encodeURI("東區");
    const res = await $axios.get(
      `http://localhost:7000/tourist?cityname=${cityarea}`
    );
    const res2 = await $axios.get("http://localhost:7000/districts");
    return {
      touristDestination: res.data,
      districtsCodeArry: res2.data
    };
  }
})
export default class HelloWorld extends Vue {
  /**郵遞區號陣列 */
  districtsCodeArry: AreaOption[] = [];

  /**旅遊景點初始陣列 */
  touristDestination: any[] = [];

  /*從子組件發來的事件->更新旅遊景點 */
  reloadTouris(val: any) {
    this.touristDestination = val;
  }

  /**郵遞區號(綁定v-model) */
  districtsZip: string = "401";

  /**郵遞區號所對應的地區名稱*/
  get districtsArea(): string {
    return (
      this.districtsCodeArry.find(item => {
        return item.zip === this.districtsZip;
      })?.name || "東區"
    );
  }

  /**地區名稱轉成encodeURI */
  get code(): string {
    return encodeURI(this.districtsArea);
  }

  /**地區名稱(districtsArea)改變，重新渲染資料*/
  @Watch("districtsArea")
  ApiGet() {
    this.$axios
      .get(`http://localhost:7000/tourist?cityname=${this.code}`)
      .then(response => (this.touristDestination = response.data));
  }

  /**爺孫組件測試 */
  // @ProvideReactive()
  // hago2: string = "5555";
}
</script>

<style lang="scss" scoped>
html,
body {
  padding: 0;
  font-family: "微軟正黑體";
}

.area_title {
  color: #634c9f;
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}
</style>
