console.log(process.env.NODE_ENV)

const server_producton = 'http://47.100.110.16:95'
const server_test = 'http://frtest.compassedu.hk/fr/template'
const server_local = 'http://192.168.0.15:8080'

export default {
  publicUrl:
    'development' == process.env.NODE_ENV
      ? server_local
      : 'test' == process.env.VUE_APP_SERVER
      ? server_test
      : server_producton,

  errorMsg: {
    default: '发生错误了，请重新尝试',
    hasSubmit: '您已提交过申请表,无法修改！',
    noLogin: '您尚未登陆，请登录后查看'
  },

  appInfo: (vue, callback) => {
    console.log('值：', vue, Object.getPrototypeOf(vue))
    if (process.env.NODE_ENV == 'development') {
      vue.rnInfo = {
        uid: 20336,
        appKey: '指南者留学',
        deviceType: 'android',
        token: 'jJFw7OjE+0e5PplkpfVuALU5xh8M8DDykUrR7QIeZ/yL3eEBTkZ0G/ebueT8zJ3Lj4erKPO8SSjcjfmKRPdzdw==',
        deviceId: 'd46c19c3ce2feaa7',
        version: '1.3.0',
        mobiletype: 'VOG'
      }
      callback()
    }
  }
}
