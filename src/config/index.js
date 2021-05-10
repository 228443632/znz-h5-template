module.exports = {
  client_id: 'phr-archive-web',
  client_secret: '123456',
  single_login_uri: '192.168.11.94:9000',
  login_res_type: 'code',
  client_name: '居民健康档案',

  proxy: {
    // 代理
    common_api_prefix: {
      // 主数据公共接口前缀
      prefix: '/main-api', // 前缀
      rule: {
        target: 'http://192.168.11.94:9000', // 目标 API 地址
        ws: true, // 如果要代理 websockets，配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/main-api': ''
        }
      }
    },

    health_records_api_prefix: {
      // 档案管理前缀
      prefix: '/phr-archive-api', // 前缀
      rule: {
        // target: 'http://192.168.21.169:9107', // 目标 API 地址  凯哥

        target: 'http://192.168.11.93:9107', // 目标 API 地址 测试线

        // target: 'http://192.168.21.147:9102', // 目标 API 地址 浩哥
        ws: true, // 如果要代理 websockets，配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/phr-archive-api': ''
        }
      }
    },

    ali_map_api_prefix: {
      // 地图请求前缀
      prefix: '/ali-map-api-prefix', // 前缀
      rule: {
        target: 'http://geo.datav.aliyun.com', // 目标 API 地址 测试线
        ws: true, // 如果要代理 websockets，配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/ali-map-api-prefix': ''
        }
      }
    },

    test_api: {
      // 个人平时测试（忽略）
      prefix: '/test-api',
      rule: {
        target: 'http://geo.datav.aliyun.com', // 目标 API 地址
        ws: true, // 如果要代理 websockets，配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/test-api': ''
        }
      }
    }
  }
}
