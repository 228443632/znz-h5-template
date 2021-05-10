/**
 * @Author bianpengfei
 * @create 2020/3/15 16:30
 */
const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const os = require('os')

const { library } = require('./dll.config.js')
const { proxy } = require('./src/config/index')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const ENV_PORT = 8088

const resolve = dir => {
  return path.join(__dirname, dir)
}

const getNetworkIp = () => {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}

// CDN
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  axios: 'axios'
}

// vue.config.js
module.exports = {
  devServer: {
    port: ENV_PORT, // 配置端口
    open: true, // 自动开启浏览器
    https: false, // https:{type:Boolean}
    hotOnly: true, // 热更新
    compress: true, // 开启压缩
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: Object.values(proxy).reduce((pre, cur) => ({ ...pre, [cur['prefix']]: cur['rule'] }), {})
  },

  // 输出文件路径，默认为dist
  outputDir: resolve('dist'),

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: '',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`true` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  css: {
    // 是否开启 CSS source map  这里开发环境下开启
    sourceMap: !isProduction
  },

  chainWebpack: config => {
    //为了补删除换行而加的配置
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions.whitespace = '' // 看源码
    //     return options
    //   })

    if (isProduction) {
      // 添加文件路径别名
      config.resolve.alias.set('@', resolve('src'))
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 移除 preload 插件
      config.plugins.delete('preload')
      // 压缩代码
      // config.optimization.minimize(true)
      // 分割代码
      // config.optimization.splitChunks({
      //   chunks: 'all'
      // })
      // 生产环境注入cdn
      // config.plugin('html').tap(args => {
      //   args[0].cdn = cdn
      //   return args
      // })
    }
  },

  configureWebpack: config => {
    //入口文件
    config.entry.app = ['babel-polyfill', './src/main.js']
    if (isProduction) {
      // 为生产环境修改配置...
      let pluginsPro = [
        ...Object.keys(library).map(name => {
          return new webpack.DllReferencePlugin({
            context: '.',
            manifest: path.join(dllPath, `${name}-manifest.json`)
          })
        })
      ]
      config.plugins = config.plugins.concat(pluginsPro)
      // 为生产环境修改配置...
      config.plugins.push(
        new BundleAnalyzerPlugin(),
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            compress: {
              // 关键代码
              warnings: true,
              drop_console: true,
              pure_funcs: ['console.log'], // 移除consol
              drop_debugger: false
            },
            extractComments: false
          }
        }),
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          filename: '[path].gz[query]', // 开启 gzip
          algorithm: 'gzip',
          deleteOriginalAssets: false //不删除源文件
        })
        //添加代码压缩工具，及设置生产环境自动删除console
      )
      // 用cdn方式引入,分离第三方插件
      // config.externals = externals
    } else {
      // config.devtool = 'source-map'
    }

    /*通用*/
    // 为开发环境修改配置...
    config.plugins.push(
      new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'windows.jQuery': 'jquery'
      }),
      new webpack.DefinePlugin({
        ENV_PORT: JSON.stringify(String(ENV_PORT)), // 端口
        ENV_HOST: JSON.stringify(String(getNetworkIp())) // 局域网地址
      })
    )
  },

  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('./src/style/app/variables.less'),
        resolve('./src/style/app/mixin.less'),
        resolve('./src/style/app/transition.scss'),
      ]
    }
  },

  publicPath: '/'
}
