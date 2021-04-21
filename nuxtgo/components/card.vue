<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6" v-for="site in value" :key="site.id">
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
                v-if="active !== site.id"
                @click="patch_data(site.名稱, site.地址, site.電話, site.id)"
              >
                修改
              </button>
              <button
                v-if="active == site.id"
                @click="patch_list(site.id, site.cityname)"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ type: Array, default: () => [] })
  value?: any[];

  /**修改旅遊景點 */
  //v-model input
  patch_name?: string = "";
  patch_address?: string = "";
  patch_phone?: string = "";

  active: string = "true";
  /**修改按鈕 */
  patch_data(name: string, address: string, phone: string, id: string) {
    this.active = id;
    this.patch_name = name;
    this.patch_address = address;
    this.patch_phone = phone;
  }
  /**更新按鈕 */
  async patch_list(idcode: string, cityname: string) {
    const code = encodeURI(cityname);
    await this.$axios.patch(`http://localhost:7000/tourist/${idcode}`, {
      名稱: this.patch_name,
      地址: this.patch_address,
      電話: this.patch_phone
    });
    await this.$axios
      .get(`http://localhost:7000/tourist?cityname=${code}`)
      .then(response => this.$emit("input", response.data));
    this.active = "";
  }

  /**刪除旅遊景點 */
  async delete_list(idcode: string, cityname: string) {
    const code = encodeURI(cityname);
    await this.$axios.delete(`http://localhost:7000/tourist/${idcode}`);
    await this.$axios
      .get(`http://localhost:7000/tourist?cityname=${code}`)
      .then(response => this.$emit("input", response.data));
  }
}
</script>

<style lang="scss" scoped>
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
</style>
