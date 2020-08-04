import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const instance = axios.create({
  timeout: 5000 // 请求超时时间
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 'application/json';
instance.defaults.baseURL = 'https://api.compassedu.hk/index.php/api/'
// const base_api = 'https://api.compassedu.hk/index.php/api/'
// const base_api = 'http://118.24.185.42:880/api/'
const base_api_883 = 'http://118.24.185.42:883/api/'
const base_api = 'http://118.24.185.42:880/api/'

// const base_api_v1 = 'https://api.compassedu.hk/index.php/api/v1/'

// request拦截器
instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    console.log('方法:', config.method)
    console.log('接口:', config.url)
    console.log('参数:', config.data || 'null')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  res => {
    console.log('服务器返回:', res.data)
    if (res.status === 200) {
      if (res.data.code == 0) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res.data)
      }
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log('服务器error:', error)
    return Promise.reject(error)
  }
)

const post = async ({ url, params = {}, rnInfo }) => {
  var headers = {}
  if (rnInfo) {
    headers = {
      Authorization: rnInfo.token,
      uid: rnInfo.uid,
      devicetype: rnInfo.deviceType,
      token: rnInfo.token,
      deviceid: rnInfo.deviceId,
      version: rnInfo.version,
      mobiletype: rnInfo.mobiletype
    }
  }
  return new Promise((resolve, reject) => {
    instance
      .post(
        url,
        {
          sign: 'last',
          timestamp: Number(new Date()),
          ...params
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            appkey: 'compassedu',
            ...headers
          }
        }
      )
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  /**
   * 目录 class level => 1:返回全部层级  0:一层
   * */
  categoryClass({ parent_id = '', level = '' }, rnInfo) {
    if (parent_id === '' || level === '') throw new Error('缺少parent_id或level参数！')
    return post({ url: base_api + 'category/class', params: data, rnInfo: rnInfo })
  },

  /**
   * 目录 list level => 1:返回全部层级  0:一层
   * */
  categoryList({ parent_id = '', level = '' }, rnInfo) {
    if (parent_id === '' || level === '') throw new Error('缺少parent_id或level参数！')
    return post({ url: base_api + 'category/list', params: data, rnInfo: rnInfo })
  },

  /**
   * 获取国家 类目
   * level => 1:返回全部层级  0:一层
   * */
  categoryCtry(data = {}, rnInfo) {
    return post({ url: base_api + 'category/list', params: { parent_id: 3, level: 1, ...data }, rnInfo: rnInfo })
  },

  /**
   * 获取专业 类目
   * level => 1:返回全部层级  0:一层
   * */
  categoryMajor(data = {}, rnInfo) {
    return post({ url: base_api + 'category/class', params: { parent_id: 0, level: 1, ...data }, rnInfo: rnInfo })
  },

  /**
   * 获取语言 类目
   * level => 1:返回全部层级  0:一层
   * */
  categoryLang(data = {}, rnInfo) {
    return post({ url: base_api + 'category/class', params: { parent_id: 5, level: 1, ...data }, rnInfo: rnInfo })
  }
}
