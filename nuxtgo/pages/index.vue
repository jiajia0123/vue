<template>
  <div id="app">
    <div class="banner">
      <h1 class="h1">台中景點資訊-Vue</h1>
      <select name="" id="sel" v-model="nowarea">
        <option :value="site.name" v-for="site in infop">
          {{ site.name }}
        </option>
      </select>
    </div>

    <h2 id="h2">{{ nowarea }}</h2>
    <div class="container">
      <div class="row">
        <div
          class="col-md-6"
          v-for="site in info"
          v-if="nowarea == site.鄉鎮市區"
        >
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
      info: null,
      infop: null,
      nowarea: "西屯區"
    };
  },

  mounted() {
    axios
      .get("https://jiajia0123.github.io/mywork/api.json")
      .then(response => (this.info = response.data))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });

    axios
      .get("https://jiajia0123.github.io/mywork/api2.json")
      .then(response2 => (this.infop = response2.data[10].districts))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  }
});
</script>

<style>
html,
body {
  padding: 0;
}
.bigaree {
  background: #fff;
  box-shadow: 1px 1px 1px 1px #c3c3c3;
  margin: 10px 10px;
  padding: 10px;
}
.h1 {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 0;
}
#h2 {
  color: #634c9f;
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 2px;
}
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
.section2 ul {
  list-style: none;
  padding-left: 0;
}
.section2 ul li {
  padding: 6px 0;
  padding-left: 25px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 28px;
}
.section2 ul li:nth-of-type(1) {
  background: url(~/assets/images/icons_clock.png) no-repeat left 7px;
}
.section2 ul li:nth-of-type(2) {
  background: url(~/assets/images/icons_pin.png) no-repeat 1px 7px;
}
.section2 ul li:nth-of-type(3) {
  background: url(~/assets/images/icons_phone.png) no-repeat 3px 7px;
}
</style>
