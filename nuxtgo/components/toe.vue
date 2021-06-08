<template>
  <div>
    {{ sq }}
    <br />
    此局由{{ who() }}下
    <div class="toe">
      <div v-for="(item, idx) in sq" :key="idx" class="sq" @click="change(idx)">
        {{ changeNumber(item) }}
      </div>

      <div>勝利:{{ check() }}</div>
      <br />
      <div style="width: 100%"><button @click="start">歸零</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

@Component({
  components: {},
})
export default class toe extends Vue {
  sq: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  sqTo: number = -1

  change(idx) {
    if (this.sq[idx] !== 0) {
      return
    }
    if (this.check() !== '還未分出勝負') {
      return
    }
    this.sqTo = -this.sqTo
    this.$set(this.sq, idx, this.sqTo) // 這樣才能同步改陣列的值
  }

  changeNumber(text) {
    return text === 0 ? '' : text === 1 ? 'O' : text === -1 ? 'X' : '222'
  }

  check(): string {
    for (let i = 0; i < 8; i++) {
      const line = lines[i]
      const [a, b, c] = line
      const sum = this.sq[a] + this.sq[b] + this.sq[c]
      if (sum === 3) return 'O贏了'
      if (sum === -3) return 'X贏了'
    }
    return '還未分出勝負'
  }

  who() {
    return this.sqTo === -1 ? 'O' : 'X'
  }

  start() {
    this.sq = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}
</script>

<style lang="scss" scoped>
.toe {
  display: flex;
  flex-wrap: wrap;
  width: 150px;
}
.sq {
  width: 50px;
  height: 50px;
  border: solid 1px #000;
  font-size: 20px;
  text-align: center;
}
</style>
