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
          <button @click="add_list">新增</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
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
    ValidationObserver
  }
})
export default class AddTourist extends Vue {
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };
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

  add_list() {
    this.$refs.form.validate().then(async success => {
      if (!success) {
        return;
      }
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

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    });
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
  top: -6px;
  left: 77px;
  color: #e44a4a;
  font-size: 0.89em;
  width: 184px;
  display: block;
}
</style>
