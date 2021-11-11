import SimpleAlert from "./SimpleAlert.vue";

const _store = {
  message: "",
  color: "",
  show: false,
  button: true,
  timeout: 0
};

const _options = {
  timeout: 10000,
  button: true
};

const SimpleAlertPlugin = {
  install(Vue, options) {
    Object.assign(_options, options);
    if (typeof _options.button == "boolean") _store.button = _options.button;
    if (typeof _options.timeout == "number") _store.timeout = _options.timeout;

    Vue.mixin({
      data() {
        return {
          alertStore: _store
        };
      }
    });

    const alert = {
      info: message => {
        if (!_store.show) {
          _store.color = "primary";
          _store.message = message;
          _store.show = true;
        }
      },
      warn: message => {
        if (!_store.show) {
          _store.color = "warning";
          _store.message = message;
          _store.show = true;
        }
      },
      error: message => {
        if (!_store.show) {
          _store.color = "error";
          _store.message = message;
          _store.show = true;
        }
      }
    };

    Vue.$alert = alert;
    Vue.prototype.$alert = Vue.$alert;

    Vue.component("SimpleAlert", SimpleAlert);
  }
};

export default SimpleAlertPlugin;
