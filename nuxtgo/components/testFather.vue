<template>
  <div>
    <testSon v-bind="$attrs" v-on="$listeners" />
    <!-- {{ value }} -->
    <!-- {{ $attrs }} //寫$attrs就會全部出現 -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import testSon from '~/components/testSon.vue'

@Component({
  components: {
    testSon,
  },
})
export default class TestFather extends Vue {
  // 在這裡寫props //下面的組件就吃不到，會阻斷
  // @Prop({ type: String, default: null })
  // value?: string
}
</script>
