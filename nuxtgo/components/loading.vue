<template>
  <div>
    <div class="vld-parent">
      <div
        class="area"
        style="
          position: relative;
          display: block;
          width: 100px;
          height: 100px;
          border: solid #000 1px;
        "
      >
        <loading
          :active.sync="isLoading"
          :can-cancel="true"
          :on-cancel="onCancel"
          :is-full-page="fullPage"
        ></loading>
      </div>

      <button @click.prevent="doAjax">抓資料按鈕</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

@Component({
  components: {
    Loading,
  },
})
export default class Card extends Vue {
  isLoading: boolean = false
  fullPage: boolean = false
  doAjax() {
    this.isLoading = true
    // simulate AJAX
    setTimeout(() => {
      this.isLoading = false
    }, 50000000)
  }

  onCancel() {
    console.log('用戶取消了抓資料')
  }
}
</script>
