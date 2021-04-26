<template>
  <div>
    <testSon v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import testSon from '~/components/testSon.vue'

@Component({
  components: {
    testSon,
  },
})
export default class TestFather extends Vue {}
</script>
