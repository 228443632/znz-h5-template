/**
 * @Author bianpengfei
 * @create 2021/2/18 10:08
 */
;(function (window, factory) {
  factory()
})(window, function () {
  const server_producton = 'http://47.100.110.16:95'
  const server_test = 'http://frtest.compassedu.hk/fr/template'
  // eslint-disable-next-line no-undef
  const server_local = `http://${ENV_HOST}:${ENV_PORT}`

  String.isString = args => Object.prototype.toString.call(args) === '[object String]'
  Object.isObject = args => Object.prototype.toString.call(args) === '[object Object]'
  Object.isNull = args => Object.prototype.toString.call(args) === '[object Null]'
  Object.isUndefined = args => Object.prototype.toString.call(args) === '[object Undefined]'
  Number.isNumber = args => Object.prototype.toString.call(args) === '[object Number]'
  Function.isFunction = args => Object.prototype.toString.call(args) === '[object Function]'
  Object.cloneDeep = obj => JSON.parse(JSON.stringify(obj))
  Array.isArrayEmpty = args => Array.isArray(args) && args.length == 0
  String.isStringEmpty = args => String.isString(args) && args == ''

  Number.prototype.mul = arg => {
    // 乘法
    let m = 0,
      s1 = this.toString(),
      s2 = arg.toString()
    try {
      m += s1.split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
  }

  Number.prototype.add = arg => {
    // 加法
    let r1, r2, m
    try {
      r1 = this.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (this.mul(m) + Number(arg).mul(m)).div(m)
  }

  Number.prototype.sub = arg => {
    // 减法
    return this.add(-arg)
  }
  Number.prototype.div = arg => {
    // 除法
    let t1 = 0,
      t2 = 0,
      r1,
      r2
    try {
      t1 = this.toString().split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    try {
      t2 = arg.toString().split('.')[1].length
      // eslint-disable-next-line no-empty
    } catch (e) {}
    r1 = Number(this.toString().replace('.', ''))
    r2 = Number(arg.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }

  // 四舍五入保留两位 n 数
  Number.prototype.toFixed = function (n) {
    let times = Math.pow(10, n)
    let des = this * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
  }

  // json解析，防止抛出异常
  JSON.parseNoError = str => {
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  }

  /* 进程环境*/
  // eslint-disable-next-line no-global-assign
  process = {
    ...process,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      BASE_URL: process.env.BASE_URL
    }
  }

  /* 挂在app信息*/
  // eslint-disable-next-line no-undef
  $app = {
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
})
