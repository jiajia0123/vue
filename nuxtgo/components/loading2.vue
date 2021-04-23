<template>
  <div
    ref="formContainer"
    class="area loadingArea"
    style="position: relative;display:block;width:100px;height:100px;border:solid #000 1px"
  >
    <button type="submit" @click="submit">Login</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import loadingSvg from "~/components/loadingSvg.vue";

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
// console.log(window.$nuxt);
@Component({
  components: { loadingSvg }
})
export default class Card2 extends Vue {
  fullPage: boolean = false;
  submit() {
    console.log(this);

    let loader = this.$loading.show(
      {
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        color: "#d20000",
        loader: "spinner",
        width: 20,
        height: 20,
        backgroundColor: "#ffffff",
        opacity: 0.5,
        zIndex: 999
      },
      {
        default: this.$createElement("loadingSvg")
      }
    );
    setTimeout(() => {
      loader.hide();
    }, 50000000);
  }
  onCancel() {
    console.log("User cancelled the loader.");
  }
}
</script>

<style lang="scss" >

</style>
