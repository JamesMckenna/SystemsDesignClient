const IS4_BASE_URL = "https://localhost:5001";

module.exports = {
  lintOnSave: true,
  publicPath: "/",

  productionSourceMap: false,

  configureWebpack: {
    devtool: "source-map",
    output: {
      globalObject: "this"
    }
  },
  devServer: {
    port: "443",
    https: true,
    hot: true,
    liveReload: true,
    host: "localhost",
    public: "https://localhost:443",
    clientLogLevel: 'debug',
    watchOptions: { poll: true }, 
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": `frame-src 'self' ${IS4_BASE_URL}; frame-ancestors 'self'`
    }
  }
};
