<template>
  <div>

      <validation-provider rules="required" v-slot="{ errors }">
        <input v-model="value" name="myinput" type="text" />
        <span>{{ errors[0] }}</span>
      </validation-provider>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

@Component({
  components: {
    ValidationProvider
  }
})
export default class AddTourist extends Vue {}
</script>
