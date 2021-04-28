<template>
  <div>
    <ValidationObserver ref="form">
      <div class="container">
        <button @click="error">{{ $t('error') }}</button>
        <button @click="success">{{ $t('success') }}</button>
        <div class="row">
          <div v-for="site in value" :key="site.id" class="col-md-6">
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
                      v-if="active == site.id"
                      v-slot="{ errors, failed }"
                      class="Provider"
                      rules="required"
                    >
                      <input
                        v-model="site.名稱"
                        :class="`is-${failed}`"
                        type="text"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>

                  <li class="add">
                    <div v-if="active !== site.id">
                      {{ site.地址 }}
                    </div>
                    <ValidationProvider
                      v-if="active == site.id"
                      v-slot="{ errors, failed }"
                      class="Provider"
                      rules="required"
                    >
                      <input
                        v-model="site.地址"
                        :class="`is-${failed}`"
                        type="text"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>
                  <li class="tel">
                    <div v-if="active !== site.id">
                      {{ site.電話 }}
                    </div>
                    <ValidationProvider
                      v-if="active == site.id"
                      v-slot="{ errors, failed }"
                      class="Provider"
                      rules="required|tel"
                    >
                      <input
                        v-model="site.電話"
                        :class="`is-${failed}`"
                        type="text"
                      />
                      <strong>{{ errors[0] }}</strong>
                    </ValidationProvider>
                  </li>
                </ul>
                <button
                  class="loadingArea_btn"
                  @click="deleteList(site.id, site.cityname)"
                >
                  {{ $t('del') }}
                </button>
                <!-- loading時如果要設定在部分區域 -->
                <div
                  :ref="`loadingAdd${site.id}`"
                  class="loadingArea"
                  style="position: relative"
                >
                  <!-- loading時如果要設定在部分區域 END -->
                  <button v-if="active !== site.id" @click="patchData(site.id)">
                    {{ $t('mod') }}
                  </button>

                  <button
                    v-if="active == site.id"
                    @click="
                      patchList(
                        site.id,
                        site.cityname,
                        site.名稱,
                        site.地址,
                        site.電話
                      )
                    "
                  >
                    {{ $tc('re', 2) }}
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { touristOption } from '~/@types'
import LoadingSvg from '~/components/loadingSvg.vue' // loading時如果要設定在部分區域
@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    LoadingSvg, // loading時如果要設定在部分區域
  },
})
export default class Card extends Vue {
  @Prop({ type: Array, default: () => [] })
  value!: touristOption[]

  active: string = 'true'
  /** 修改按鈕 */
  patchData(id: string) {
    this.active = id
  }

  /** 更新按鈕 */
  $refs!: {
    form: InstanceType<typeof ValidationObserver>
  }

  $notify: any
  $loading: any
  fullPage: boolean = false

  async patchList(
    idcode: string,
    cityname: string,
    name: string,
    address: string,
    phone: string
  ) {
    const addcode: string = `loadingAdd${idcode}`
    const loader = this.$loading.show(
      { container: this.fullPage ? null : this.$refs[addcode][0] }, // loading時如果要設定在部分區域
      { default: this.$createElement('LoadingSvg') } // loading時如果要設定在部分區域
    )
    const success = await this.$refs.form.validate()
    if (!success) {
      loader.hide()
      return
    }
    const code = encodeURI(cityname)
    /** API修改該筆資料內容 */
    await this.$api.patch(`/tourist/${idcode}`, {
      名稱: name,
      地址: address,
      電話: phone,
    })
    /** API更新當前頁面內容 */
    const response = await this.$api.get(`/tourist?cityname=${code}`)
    this.$emit('input', response.data)
    this.active = ''
    this.$nextTick(() => {
      this.$refs.form.reset()
    })
    loader.hide()
  }

  /** 刪除旅遊景點 */
  async deleteList(idcode: string, cityname: string) {
    const loader = this.$loading.show()
    const code = encodeURI(cityname)
    await this.$api.delete(`/tourist/${idcode}`)
    const response = await this.$api.get(`/tourist?cityname=${code}`)
    this.$emit('input', response.data)
    loader.hide()
  }

  /** 錯誤按鈕 */
  error() {
    this.$notify({ group: 'error', type: 'error', text: '失敗了' })
  }

  /** 成功按鈕 */
  success() {
    this.$notify({ group: 'success', type: 'success', text: '成功了' })
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
    width: 68px;
    position: relative;
    left: -51px;
  }
}
.loadingArea_btn {
  width: 68px;
}
.vld-overlay {
  right: 50px;
}
</style>
