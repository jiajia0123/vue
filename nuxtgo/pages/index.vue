<template>
  <div id="app">
    <div class="banner">
      {{ districtsArea }}
      {{ code }}
      <h1 class="bigtitle">台中景點資訊-Vue</h1>

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
          <span>景點名稱</span><input type="text" v-model="name" />
        </div>
        <div class="add_Tourist_block">
          <span>行政區域</span>
          <select v-model="area">
            <option
              :value="site.name"
              v-for="site in districtsCodeArry"
              :key="site.zip"
            >
              {{ site.name }}
            </option>
          </select>
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
        <div class="col-md-6" v-for="site in touristDestination" :key="site.id">
          <div class="bigaree">
            <div class="section1">
              <div class="titBig">{{ site.名稱 }}</div>
              <div class="titsmall">{{ site.cityname }}</div>
            </div>
            <div class="section2">
              <ul>
                <li class="opentime">
                  <div v-if="active !== site.id">
                    {{ site.名稱 }}
                  </div>

                  <input
                    v-if="active == site.id"
                    type="text"
                    v-model="patch_name"
                  />
                </li>

                <li class="add">
                  <div v-if="active !== site.id">
                    {{ site.地址 }}
                  </div>
                  <input
                    v-if="active == site.id"
                    type="text"
                    v-model="patch_address"
                  />
                </li>
                <li class="tel">
                  <div v-if="active !== site.id">
                    {{ site.電話 }}
                  </div>
                  <input
                    v-if="active == site.id"
                    type="text"
                    v-model="patch_phone"
                  />
                </li>
              </ul>
              <button @click="delete_list(site.id, site.cityname)">刪除</button>
              <button
                @click="patch_data(site.名稱, site.地址, site.電話, site.id)"
              >
                修改
              </button>
              <button @click="patch_list(site.id, site.cityname, site)">
                更新
              </button>
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
  /**取得旅遊景點陣列touristDestination*/
  async asyncData() {
    console.log("你好嗎");
    const cityarea = encodeURI("東區");
    const res = await axios.get(
      `http://localhost:7000/tourist?cityname=${cityarea}`
    );
    const res2 = await axios.get("http://localhost:7000/districts");
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

  /**新增旅遊景點 */
  id?: number;
  name: string = "";
  area: string = "";
  address: string = "";
  tel?: number | null = null;

  async add_list() {
    await axios.post(
      "http://localhost:7000/tourist",
      {
        id: this.id,
        名稱: this.name,
        cityname: this.area,
        地址: this.address,
        電話: this.tel
      } //,{params: { name: "234"}}
    );
    this.id = undefined;
    this.name = "";
    this.area = "";
    this.address = "";
    this.tel = undefined;
    await axios
      .get(`http://localhost:7000/tourist?cityname=${this.code}`)
      .then(response => (this.touristDestination = response.data));
  }

  /**修改旅遊景點 */
  patch_name?: string = "";
  patch_address?: string = "";
  patch_phone?: string = "";

  active: string = "true";
  patch_data(name: string, address: string, phone: string, id: string) {
    this.active = id;
    this.patch_name = name;
    this.patch_address = address;
    this.patch_phone = phone;
  }

  async patch_list(idcode: string, cityname: string, context: any) {
    const code = encodeURI(cityname);
    await axios.patch(`http://localhost:7000/tourist/${idcode}`, {
      名稱: this.patch_name || context.名稱,
      地址: this.patch_address || context.地址,
      電話: this.patch_phone || context.電話
    });
    await axios
      .get(`http://localhost:7000/tourist?cityname=${code}`)
      .then(response => (this.touristDestination = response.data));
    this.active = true;
  }

  /**刪除旅遊景點 */
  async delete_list(idcode: string, cityname: string) {
    const code = encodeURI(cityname);
    await axios.delete(`http://localhost:7000/tourist/${idcode}`);
    await axios
      .get(`http://localhost:7000/tourist?cityname=${code}`)
      .then(response => (this.touristDestination = response.data));
  }

  /**郵遞區號(綁定v-model) */
  districtsZip: number = 401;

  /**郵遞區號對應的地區名稱*/
  get districtsArea(): string {
    return (
      this.districtsCodeArry.find(item => {
        return item.zip == this.districtsZip;
      })?.name || "東區"
    );
  }

  /**地區名稱轉成encode */
  get code(): string {
    return encodeURI(this.districtsArea);
  }

  /**districtsZip改變，重新渲染districtsCodeArry資料*/
  @Watch("districtsArea")
  ApiGet(newval: string, oldVal: string) {
    axios
      .get(
        `http://localhost:7000/tourist?cityname=${this.code}` //,{params: { name: "234"}}
      )
      .then(response => (this.touristDestination = response.data));
  }

  /**組件測試用 */
  mey: number = 123;
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
      min-height: 28px;
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
  .add_Tourist_block select {
    margin-left: 1px;
    margin-bottom: 6px;
  }
  button {
    margin: 0 0 0 auto;
    display: block;
    margin-right: 30px;
  }
}
</style>
