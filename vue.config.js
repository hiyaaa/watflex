module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/",

  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },

  css: {
    extract: true
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_HOST,
        changeOrigin: true
      }
    },
    public: "0.0.0.0",
    disableHostCheck: true
  },
  pluginOptions: {
    i18n: {
      locale: "ko",
      fallbackLocale: "ko",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
