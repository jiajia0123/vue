<template>
  <div>
    <div class="container">
      <ValidationObserver ref="form">
        <div class="add_Tourist">
          <div class="add_Tourist_block">
            <span>景點名稱</span>
            <ValidationProvider
              v-slot="{ errors, failed }"
              class="Provider"
              rules="required"
            >
              <input
                v-model="newTour.name"
                type="text"
                :class="`is-${failed}`"
              />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div class="add_Tourist_block">
            <span>行政區域</span>

            <ValidationProvider
              v-slot="{ errors, failed }"
              class="Provider"
              rules="required"
            >
              <select v-model="newTour.area" :class="`is-${failed}`">
                <option
                  v-for="site in districtsCodeArry"
                  :key="site.zip"
                  :class="`is-${failed}`"
                  :value="site.name"
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
              v-slot="{ errors, failed }"
              class="Provider"
              rules="required"
            >
              <input
                v-model="newTour.address"
                type="text"
                :class="`is-${failed}`"
              />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>
          <div class="add_Tourist_block">
            <span>電話</span>
            <ValidationProvider
              v-slot="{ errors, failed }"
              class="Provider"
              rules="required|tel"
            >
              <input
                v-model="newTour.tel"
                type="text"
                :class="`is-${failed}`"
              />
              <strong>{{ errors[0] }}</strong>
            </ValidationProvider>
          </div>

          <button @click="addList">新增</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate' // 驗證規則
import { AreaOption } from '~/@types'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class AddTourist extends Vue {
  @Prop({ type: Array, default: () => [] })
  districtsCodeArry!: AreaOption[]

  @Prop({ type: String, default: null })
  code!: string

  /** 新增旅遊景點 */

  newTour = this.addTour()

  addTour() {
    return {
      name: '',
      area: '',
      address: '',
      tel: null,
    }
  }

  $refs!: {
    form: InstanceType<typeof ValidationObserver>
    loadingAdd: InstanceType<typeof ValidationObserver>
  }

  $loading: any
  fullPage: boolean = false
  async addList() {
    const loader = this.$loading.show()
    const success = await this.$refs.form.validate()
    if (!success) {
      loader.hide()
      return
    }

    this.$refs.form.reset()

    const { name, area, address, tel } = this.newTour
    // this.$api.defaults.headers.common.Authorization = '88886666'

    await this.$api.post(`/tourist`, {
      名稱: name,
      cityname: area,
      地址: address,
      電話: tel,
    })

    this.newTour = this.addTour()

    const response = await this.$api.get(`/tourist?cityname=${this.code}`)
    this.$emit('reloadTouris', response.data)
    loader.hide()
  }
}

// add_list () {
//   this.$refs.form.validate().then(success => {
//     if (!success) {
//       return;
//     }

//     const { name, cityname, address, tel } = this.formData

//     this.$axios.post("http://localhost:7000/tourist", {
//       名稱: name,
//       cityname,
//       地址: address,
//       電話: tel
//     }).then(() => {
//       this.formData = this.getDefaultFromData()

//       this.$axios
//         .get(`http://localhost:7000/tourist?cityname=${this.code}`)
//         .then(response => {
//           this.$emit("reloadTouris", response.data)
//           this.$refs.form.reset();
//           });
//       });
//   });
// }
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
