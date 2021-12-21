const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/mill/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  },

  transpileDependencies: [
    'vuetify'
  ]
}
