<template>
  <div>
    <ValidationObserver ref="form">
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
                    <ValidationProvider
                      class="Provider"
                      v-slot="{ errors, failed }"
                      rules="required"
                      v-if="active == site.id"
                    >
                      <input
                        :class="`is-${failed}`"
                        type="text"
                        v-model="site.名稱"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>

                  <li class="add">
                    <div v-if="active !== site.id">
                      {{ site.地址 }}
                    </div>
                    <ValidationProvider
                      class="Provider"
                      v-slot="{ errors, failed }"
                      rules="required"
                      v-if="active == site.id"
                    >
                      <input
                        :class="`is-${failed}`"
                        type="text"
                        v-model="site.地址"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>
                  <li class="tel">
                    <div v-if="active !== site.id">
                      {{ site.電話 }}
                    </div>
                    <ValidationProvider
                      class="Provider"
                      v-slot="{ errors, failed }"
                      rules="required|tel"
                      v-if="active == site.id"
                    >
                      <input
                        :class="`is-${failed}`"
                        type="text"
                        v-model="site.電話"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>
                </ul>
                <button @click="delete_list(site.id, site.cityname)">
                  刪除
                </button>
                <div
                  :ref="`loadingAdd${site.id}`"
                  class="loadingArea"
                  style="position: relative;"
                >
                  <button
                    v-if="active !== site.id"
                    @click="
                      patch_data(site.名稱, site.地址, site.電話, site.id)
                    "
                  >
                    修改
                  </button>

                  <button
                    v-if="active == site.id"
                    @click="
                      patch_list(
                        site.id,
                        site.cityname,
                        site.名稱,
                        site.地址,
                        site.電話
                      )
                    "
                  >
                    更新
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import Loading from "vue-loading-overlay"; //loading.vue
import "vue-loading-overlay/dist/vue-loading.css"; //loading.vue
import loadingSvg from "~/components/loadingSvg.vue"; //loading.vue
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
export default class Card extends Vue {
  @Prop({ type: Array, default: () => [] })
  value?: any[];

  active: string = "true";
  /**修改按鈕 */
  patch_data(name: string, address: string, phone: string, id: string) {
    this.active = id;
  }
  /**更新按鈕 */
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };
  $loading: any;
  fullPage: boolean = false;
  mounted() {
    console.log(this.$refs);
  }
  async patch_list(
    idcode: string,
    cityname: string,
    name: string,
    address: string,
    phone: string
  ) {
    let addcode: any = `loadingAdd${idcode}`;
    console.log(addcode);

    let loader = this.$loading.show(
      { container: this.fullPage ? null : this.$refs[addcode][0] },
      { default: this.$createElement("loadingSvg") }
    );
    const success = await this.$refs.form.validate();
    if (!success) {
      loader.hide();
      return;
    }
    const code = encodeURI(cityname);
    /**修改該筆資料內容 */
    await this.$axios.patch(`http://localhost:7000/tourist/${idcode}`, {
      名稱: name,
      地址: address,
      電話: phone
    });
    /**更新當前頁面內容 */
    const response = await this.$axios.get(
      `http://localhost:7000/tourist?cityname=${code}`
    );
    this.$emit("input", response.data);
    this.active = "";
    this.$nextTick(() => {
      this.$refs.form.reset();
    });
    loader.hide();
  }

  /**刪除旅遊景點 */
  async delete_list(idcode: string, cityname: string) {
    let loader = this.$loading.show();
    const code = encodeURI(cityname);
    await this.$axios.delete(`http://localhost:7000/tourist/${idcode}`);
    const response = await this.$axios.get(
      `http://localhost:7000/tourist?cityname=${code}`
    );
    this.$emit("input", response.data);
    loader.hide();
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
  ul {
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

.is-true {
  outline: solid 1px #ff0f0f;
}
.Provider {
  position: relative;
}
.Provider strong {
  position: relative;
  top: 0px;
  left: 0px;
  color: #e44a4a;
  font-size: 0.89em;
  width: 184px;
  display: block;
}
.loadingArea {
  width: 35px;
  height: 30px;
  margin-left: 54px;
  display: inline-block;
  button {
    width: 48px;
    position: relative;
    left: -51px;
  }
}
.vld-overlay {
  right: 50px;
}
</style>
