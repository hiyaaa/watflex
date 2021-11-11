<template>
  <div>
    <base-custom-select
      :selectVal="locale"
      :items="BaseCustomSelect"
      label="locale"
      width="100"
      text
      @clickList="selectLocale"
    ></base-custom-select>
  </div>
</template>

<script>
import { getSupportedLocales } from "@/utils/i18n/supported-locales";
import { sync } from "vuex-pathify";

export default {
  data: () => ({
    BaseCustomSelect: getSupportedLocales(),
    menuVal: false
  }),
  computed: {
    locale: sync("app/locale")
  },
  methods: {
    selectLocale(val) {
      this.$i18n.locale = val;
      this.locale = val;
    }
  },
  created() {
    this.$i18n.locale = this.locale;
  }
};
</script>
<style scoped>
.locale-switcher {
  width: 100px;
}
</style>
