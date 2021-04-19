<template>
  <div id="app">
    <div class="banner">
      {{ districtsArea }}
      <h1 class="bigtitle">台中景點資訊-Vue</h1>
      {{ res2 }}
      <select name="" id="sel" v-model="districtsZip">
        <option
          :value="site.zip"
          v-for="site in districtsCodeArry"
          :key="site.zip"
        >
          {{ site.name }}
        </option>
      </select>
    </div>

    <div class="container">
      <div class="add_Tourist">
        <div class="add_Tourist_block">
          <span>編號</span><input type="text" v-model="id" />
        </div>
        <div class="add_Tourist_block">
          <span>景點名稱</span><input type="text" v-model="name" />
        </div>
        <div class="add_Tourist_block">
          <span>鄉鎮市區</span><input type="text" v-model="area" />
        </div>
        <div class="add_Tourist_block">
          <span>地址</span><input type="text" v-model="address" />
        </div>
        <div class="add_Tourist_block">
          <span>電話</span><input type="text" v-model="tel" />
        </div>
        <button @click="add_list">新增</button>
      </div>
    </div>
    <h2 class="area_title">{{ districtsArea }}</h2>
    <div class="container">
      <div class="row">
        <div
          class="col-md-6"
          v-for="site in touristDestination_final"
          :key="site.id"
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
                <li class="tel">{{ site.電話  }}</li>
              </ul>
              <button @click="delete_list(site.id)">{{site.id}}刪除</button>
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

    <todo :merr="mey">這是父組件插曹</todo>
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

interface AreaOption {
  zip: number;
  name: string;
}

@Component({
  /**取得郵遞區號陣列districtsCodeArry*/
  /**取得旅遊景點初始陣列touristDestination_initial*/
  async asyncData({ $AAxios }) {
    console.log("你好嗎");

    const res = await $AAxios("http://localhost:7000/tourist");
    const res2 = await axios.get("http://localhost:7000/districts");
    return {
      touristDestination_initial: res.data,
      districtsCodeArry: res2.data
    };
  }
})
export default class HelloWorld extends Vue {
  id?: number
  name: string = "";
  area: string = "";
  address: string = "";
  tel?: number

  add_list() {
    axios.post(
      "http://localhost:7000/tourist",
      {
        id: this.id,
        名稱: this.name,
        鄉鎮市區: this.area,
        地址: this.address,
        電話: this.tel
      } //,{params: { name: "234"}}
    );
  }

  delete_list(idcode:string) {
    axios.delete(
      `http://localhost:7000/tourist/${idcode}`
    );
  }

    delete_patch(idcode:string) {
    axios.patch(
      `http://localhost:7000/tourist/${idcode}`,{}
    );
  }

  /**郵遞區號 */
  districtsZip: number = 401;

  /**所選擇郵遞郵遞區號對應的地區名稱 */
  get districtsArea(): string {
    return (
      this.districtsCodeArry.find(item => {
        return item.zip == this.districtsZip;
      })?.name || "東區"
    );
  }
  /**郵遞區號陣列 */
  districtsCodeArry: AreaOption[] = [];

  /**旅遊景點初始陣列 */
  touristDestination_initial: any[] = [];

  /**所選擇的地區對應的旅遊景點列表*/
  get touristDestination_final() {
    const arr = this.touristDestination_initial.filter(
      item => item.鄉鎮市區 == this.districtsArea
    );
    return arr;
  }

  /**組件測試用 */
  mey: number = 123;

  /**監聽郵遞區號列表改變，就重新打API */
  @Watch("districtsArea")
  ApiGet() {
    axios
      .get(
        "http://localhost:7000/tourist" //,{params: { name: "234"}}
      )
      .then(response => (this.touristDestination_initial = response.data));
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  padding: 0;
  font-family: "微軟正黑體";
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

.add_Tourist {
  width: 330px;
  margin-top: 10px;
  background: #fff;
  padding: 11px 20px;
  border: solid 2px #8d86ce;
  .add_Tourist_block span {
    width: 68px;
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
  }
  .add_Tourist_block input {
    display: inline-block;
    margin-bottom: 6px;
    margin-left: 5px;
  }
  button {
    margin: 0 0 0 auto;
    display: block;
    margin-right: 30px;
  }
}
</style>
