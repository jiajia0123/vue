<template>
  <div id="app">
    <div class="banner">
      <h1 class="bigtitle">台中景點資訊-Vue</h1>
      <select id="sel" v-model="nowarea" name="">
        <option v-for="site in infop" :key="site.zip" :value="site.name">
          {{ site.name }}
        </option>
      </select>
    </div>

    <h2 class="area_title">{{ nowarea }}</h2>
    <div class="container">
      <div class="row">
        <div v-for="site in info2" :key="site.名稱" class="col-md-6">
          <div class="bigaree">
            <div class="section1">
              <div class="titBig">{{ site.名稱 }}</div>
              <div class="titsmall">{{ site.cityname }}</div>
            </div>
            <div class="section2">
              <ul>
                <li class="opentime">{{ site.名稱 }}</li>
                <li class="add">{{ site.地址 }}</li>
                <li class="tel">{{ site.電話 }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>由原始javascrip版本改成Vue框架、axios使用--100%自己手寫練習</p>
      <p><a target="_blank" href="js/台中景點資訊.js">js檔觀看</a></p>
      <p>
        <a target="_blank" href="https://jiajia0123.github.io/mywork/index.htm"
          >進入原始javascrip版本</a
        >
      </p>
    </div>

    <span>test55555</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  // data
  nowarea: string = '東區'
  info: any[] = []
  infop: any[] = []

  // computed
  get info2(): any[] {
    return []
  }

  // watch
  @Watch('nowarea')
  async onNowareaChange() {
    const res = await this.$axios.get('http://localhost:7000/data0')
    this.info = res.data
  }

  async mounted() {
    const res = await this.$axios.get('http://localhost:7000/data0')
    const res2 = await this.$axios.get(
      'https://jiajia0123.github.io/mywork/api2.json'
    )

    this.info = res.data
    this.infop = res2.data
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  padding: 0;
}
.bigtitle {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 0;
  text-align: center;
}
.area_title {
  color: #634c9f;
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}

.bigaree {
  background: #fff;
  box-shadow: 1px 1px 1px 1px #c3c3c3;
  margin: 10px 10px;
  padding: 10px;
  position: relative;
  .section1 {
    .titsmall {
      font-size: 17px;
      position: absolute;
      right: 39px;
      top: 26px;
      font-weight: bold;
      color: #555;
    }

    .titBig {
      font-size: 20px;
      font-weight: bold;
      margin: 5px 0;
      color: #004f8d;
    }
  }
}

.section2 {
  > ul {
    list-style: none;
    padding-left: 0;
    > li {
      padding: 6px 0;
      padding-left: 25px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 28px;
      &:nth-of-type(1) {
        background: url(~/assets/images/icons_clock.png) no-repeat left 7px;
      }
      &:nth-of-type(2) {
        background: url(~/assets/images/icons_pin.png) no-repeat 1px 7px;
      }
      &:nth-of-type(3) {
        background: url(~/assets/images/icons_phone.png) no-repeat 3px 7px;
      }
    }
  }
}
</style>
