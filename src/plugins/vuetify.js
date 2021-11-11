import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/scss/vuetify/overrides.scss'
Vue.use(Vuetify);

const theme = {
  primary: "#1e88e5",
  info: "#1e88e5",
  success: "#21d67b",
  accent: "#fc4b6c",
  rogue: "#BF0000",
  default: "#563dea",
  critical: "#ff0000",
  minor: "#A6A6A6"
};

export default new Vuetify({
    theme: {
        themes: {
          dark: theme,
          light: theme,
        },
      }
});
