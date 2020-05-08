console.log(process.env.NODE_ENV)

const server_producton = 'http://47.100.110.16:95'
const server_test = 'http://47.102.203.83:95'
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
}
