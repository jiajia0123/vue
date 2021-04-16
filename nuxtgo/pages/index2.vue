<template>
  <div id="app">
    <div class="banner">
      <h1 class="bigtitle">台中景點資訊-Vue</h1>
      <select name="" id="sel" v-model="nowarea">
        <option :value="site.name" v-for="site in infop" :key="site.zip">
          {{ site.name }}
        </option>
      </select>
    </div>

    <h2 class="area_title">{{ nowarea }}</h2>
    <div class="container">
      <div class="row">
        <div class="col-md-6" v-for="site in info2" :key="site.名稱">
          <div class="bigaree">
            <div class="section1">
              <div class="titBig">{{ site.名稱 }}</div>
              <div class="titsmall">{{ site.鄉鎮市區 }}</div>
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

<script>
import Vue from "vue";
import axios from "axios";
export default Vue.extend({
  data() {
    return {
      nowarea: "東區"
    };
  },
  watch: {
    nowarea() {
      axios
        .get(
          "http://localhost:7000/data0"
          //         ,{params: { name: "234"
          // }}
        )
        .then(response => (this.info = response.data));
    }
  },
  async asyncData({ $AAxios }) {
    console.log("你好嗎");
    const res = await $AAxios("http://localhost:7000/data0");
    const res2 = await axios.get(
      "https://jiajia0123.github.io/mywork/api2.json"
    );
    return {
      info: res.data,
      infop: res2.data[10].districts
    };
  },
  computed: {
    info2() {
      let arr = this.info.filter(item => {
        return item.鄉鎮市區 == this.nowarea;
      });
      return arr;
    }
  },
  async mounted() {
    this.$AAxios_POST("http://localhost:7000/data0");

    // console.log( $AAxios("http://localhost:7000/data0"));
  }
  // mounted() {
  //   axios
  //     .get("https://jiajia0123.github.io/mywork/api.json")
  //     .then(response => (this.info = response.data))
  //     .catch(function(error) {
  //       // 请求失败处理
  //       console.log(error);
  //     });
  //   axios
  //     .get("https://jiajia0123.github.io/mywork/api2.json")
  //     .then(response2 => (this.infop = response2.data[10].districts))
  //     .catch(function(error) {
  //       // 请求失败处理
  //       console.log(error);
  //     });
  // }
});
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
