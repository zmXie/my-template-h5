// 增加环境变量
const packageJson = require("./package.json");
process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_NAMESPACE = packageJson.name;
process.env.VUE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  publicPath: "./",
  devServer: {
    port: process.env.VUE_APP_DEV_PORT, // dev port
    hot: true,
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`,
      },
    },
  },
  transpileDependencies: ["import-html-entry"],
  configureWebpack: {
    devServer: {
      watchOptions: {},
    },
  },
  chainWebpack: (config) => {
    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === "production") {
      config.plugin("html").tap((options) => {
        options[0].minify.collapseWhitespace = false;
        return options;
      });
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 102400, // 对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: false, // 删除源文件
        })
      );
      config.plugin("limitChunkCountPlugin").use(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 15,
          minChunkSize: 100,
        })
      );
    }
  },
  // 不输出 map 文件
  productionSourceMap: false,
};
