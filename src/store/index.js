// Vue
import Vue from "vue";
import Vuex from "vuex";
import pathify from "vuex-pathify";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

// Modules
import * as modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
    createPersistedState({
      paths: ["app", "account"],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
});

export default store;
