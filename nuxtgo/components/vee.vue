<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
      rules="positive|min:2,3"
      :bails="false"
    >
      <input v-model="value" type="text" />
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </ValidationProvider>
    <br />
    必須是在'東區','西區','北區' 其中之一
    <ValidationProvider v-slot="{ errors }" rules="x:東區,西區,北區">
      <input v-model="value2" name="email" id="email2" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
    <br />
    必填
    <ValidationProvider v-slot="{ errors }" rules="must">
      <input v-model="value2" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <br />
    群組選項<br />
    <ValidationObserver ref="form">
      <ValidationProvider name="a1" v-slot="{ errors, failed }" rules="email">
        <input :class="`is-${failed}`" v-model="value2" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <ValidationProvider name="a2" v-slot="{ errors, failed }" rules="email">
        <input :class="`is-${failed}`" v-model="value3" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <ValidationProvider name="a3" v-slot="{ errors, failed }" rules="email">
        <input :class="`is-${failed}`" v-model="value4" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <br />
      <button @click="onSubmit">送出</button>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { email } from "vee-validate/dist/rules";

extend("positive", value => {
  return value >= 100 ? "" : "必須大於100";
});

extend("min", {
  validate(value, { min, max }: any) {
    return value.length >= min && value.length <= max
      ? ""
      : "長度必須{min}~{max}喔!";
  },
  params: ["min", "max"]
});

extend("x", (value, values) => {
  return values.indexOf(value) !== -1
    ? ""
    : "{_field_}{_value_}{_rule_}你必須輸入{東區或西區或北區}";
});

extend("must", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  message: "你沒有填資料",
  computesRequired: true
});

extend("tel", {
  validate: value => {
    return value.length > 3;
  },
  message: "你的電話長度過短"
});

extend("email", {
  ...email,
  message: "必須為email格式",
  computesRequired: true
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class Vee extends Vue {
  value?: number | string = 0;
  value2: number | string = "";
  value3: number | string = "";
  value4: number | string = "";

  /**typescipt要加這段 */
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  onSubmit() {
    this.$refs.form.validate().then(success => {
      if (!success) {
        return;
      }

      alert("成功囉");

      this.value2 = this.value3 = this.value4 = 0;

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    });
  }
}
</script>

<style lang="scss" scoped>
input.is-true {
  outline: solid 1px #ff0f0f;
}
</style>
