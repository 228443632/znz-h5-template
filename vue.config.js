const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const externals = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   axios: 'axios'
// }

module.exports = {
  // devServer: {
  //     open: false, // 启动服务后是否打开浏览器
  //     host: '127.0.0.1',
  //     port: 8081, // 服务端口
  //     https: false,
  //     hotOnly: false,
  //     proxy: ''
  // },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
          })
        ],
        optimization: {
          minimizer:
            'test' == process.env.VUE_APP_SERVER
              ? []
              : [
                  new UglifyJsPlugin({
                    uglifyOptions: {
                      compress: {
                        warnings: false,
                        drop_console: true, //console
                        drop_debugger: false,
                        pure_funcs: ['console.log'] //移除console
                      }
                    }
                  })
                ]
        }
        // externals: externals
      }
    } else {
      return {
        // externals: externals
      }
    }
  },
  publicPath:'./',
  // baseUrl:''
}
