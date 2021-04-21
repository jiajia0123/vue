<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";


interface AreaOption {
  zip: string;
  name: string;
}
@Component
export default class AddTourist extends Vue {
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry?: AreaOption[];
  @Prop({ type: String, default: null })
  code?: string;

  /**新增旅遊景點 */
  id?: number;
  name: string = "";
  area: string = "";
  address: string = "";
  tel?: number | null = null;

  async add_list() {
    await this.$axios.post("http://localhost:7000/tourist", {
      id: this.id,
      名稱: this.name,
      cityname: this.area,
      地址: this.address,
      電話: this.tel
    });
    this.id = undefined;
    this.name = "";
    this.area = "";
    this.address = "";
    this.tel = null;
    await this.$axios
      .get(`http://localhost:7000/tourist?cityname=${this.code}`)
      .then(response => this.$emit("reloadTouris", response.data));
  }
}
</script>

<style lang="scss" scoped>
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
