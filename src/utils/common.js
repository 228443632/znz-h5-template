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
