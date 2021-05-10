<template>
  <div>
    <input v-model="data" type="text" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ type: Array, default: () => [] })
  data!: string
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
