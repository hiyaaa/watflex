import Vue from "vue";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import store from "@/store";
import Vuebar from "vuebar";
import "@/plugins/base";
import VueSkycons from "vue-skycons";
import i18n from "@/i18n";
import VueApexCharts from "vue-apexcharts";
import SimpleAlert from "@/plugins/simple-alert";
import UtilMixin from "@/mixin/UtilMixin";
import InfiniteScroll from 'v-infinite-scroll'

Vue.use(VueSkycons, {
  color: "#1e88e5"
});

Vue.config.productionTip = false;
Vue.use(Vuebar);

Vue.use(InfiniteScroll);

//alert - toast message
Vue.use(SimpleAlert);

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

Vue.mixin(UtilMixin);

new Vue({
  vuetify,
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
