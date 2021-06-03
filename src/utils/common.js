/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */

/**
 * 解析get链接参数， 并返回对象
 * @param url
 * @returns {{}}
 */
export const parseQueryString = (url = '') => {
  const obj = {}
  const str = url?.split('?')?.[1]
  const arr = str?.split('&')
  arr?.forEach(v => {
    let item = v.split('=')
    let a = item[0]
    let b = item[1]
    obj[a] = b
  })
  return obj
}

/**
 * @Author bianpengfei
 * @create 2020/5/9 21:52
 */
export const _formatDate = (fmt, date = new Date()) => {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/*产生随机唯一值*/
export const uniqueKey = (start = 2) => Math.random().toString(36).substring(start)
