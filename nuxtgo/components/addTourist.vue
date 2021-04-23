<template>
  <div>
    <div class="container">
      <ValidationObserver ref="form">
        <div class="add_Tourist">
          <div class="add_Tourist_block">
            <span>景點名稱</span>
            <ValidationProvider
              class="Provider"
              v-slot="{ errors, failed }"
              rules="required"
            >
              <input type="text" v-model="name" :class="`is-${failed}`" />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div class="add_Tourist_block">
            <span>行政區域</span>

            <ValidationProvider
              class="Provider"
              v-slot="{ errors, failed }"
              rules="required"
            >
              <select v-model="area" :class="`is-${failed}`">
                <option
                  :class="`is-${failed}`"
                  :value="site.name"
                  v-for="site in districtsCodeArry"
                  :key="site.zip"
                >
                  {{ site.name }}
                </option>
              </select>
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div class="add_Tourist_block">
            <span>地址</span>

            <ValidationProvider
              class="Provider"
              v-slot="{ errors, failed }"
              rules="required"
            >
              <input type="text" v-model="address" :class="`is-${failed}`" />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div class="add_Tourist_block">
            <span>電話</span>
            <ValidationProvider
              class="Provider"
              v-slot="{ errors, failed }"
              rules="required|tel"
            >
              <input type="text" v-model="tel" :class="`is-${failed}`" />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div ref="loadingAdd" class="loadingArea" style="position: relative;">
            <button @click="add_list">新增</button>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate"; //驗證規則
import { email, required } from "vee-validate/dist/rules"; //驗證規則
import Loading from "vue-loading-overlay"; //loading.vue
import "vue-loading-overlay/dist/vue-loading.css"; //loading.vue
import loadingSvg from "~/components/loadingSvg.vue"; //loading.vue
Vue.use(
  Loading,
  {
    // props
    color: "blue"
  },
  {
    // slots
  }
);
interface AreaOption {
  zip: string;
  name: string;
}
extend("required", {
  ...required,
  message: "此為必填欄位哦",
  computesRequired: true
});

extend("tel", {
  validate: value => {
    return value.length > 5;
  },
  message: "你的電話長度過短"
});
@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    loadingSvg
  }
})
export default class AddTourist extends Vue {
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry!: AreaOption[];
  @Prop({ type: String, default: null })
  code?: string;

  /**新增旅遊景點 */

  name: string = "";
  area: string = "";
  address: string = "";
  tel?: number | null = null;

  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
    loadingAdd: InstanceType<typeof ValidationObserver>;
  };
  $loading: any;
  fullPage: boolean = false;
  async add_list() {
    let loader = this.$loading.show(
      { container: this.fullPage ? null : this.$refs.loadingAdd },
      { default: this.$createElement("loadingSvg") }
    );
    const success = await this.$refs.form.validate();
    if (!success) {
      loader.hide();
      return;
    }
    this.$nextTick(() => {
      this.$refs.form.reset();
    });
    await this.$axios.post("http://localhost:7000/tourist", {
      名稱: this.name,
      cityname: this.area,
      地址: this.address,
      電話: this.tel
    });

    this.name = "";
    this.area = "";
    this.address = "";
    this.tel = null;

    const response = await this.$axios.get(
      `http://localhost:7000/tourist?cityname=${this.code}`
    );
    this.$emit("reloadTouris", response.data);
    loader.hide();
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
  .add_Tourist_block > span:nth-of-type(1) {
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
    margin-left: 5px;
    margin-bottom: 6px;
  }
  button {
    margin: 0 0 0 auto;
    display: block;
    margin-right: 30px;
    position: absolute;
    left: 49px;
  }
}

.is-true {
  outline: solid 1px #ff0f0f;
}
.Provider {
  position: relative;
}
.Provider strong {
  position: relative;
  top: -5px;
  left: 77px;
  color: #e44a4a;
  font-size: 0.89em;
  width: 184px;
  display: block;
}
.loadingArea {
  position: relative;
  width: 50px;
  height: 35px;
  margin-left: 161px;
}
</style>
