/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/4/15 9:37
 */

/*生成 nav 属性*/
export const generateNavAttr = (route = {}) => {
  console.log('route', route)
  return {
    name: route.name,
    path: route.path,
    fullPath: route.fullPath,
    meta: route.meta,
    title: route.title,
    params: route.params,
    query: route.query,
    key: route.key || route.fullPath
  }
}

/*移除缓存路由*/
export const rmCacheRoute = (fullPath = '', vm) => {
  if (vm?.$vnode?.data?.keepAlive) {
    if (vm?.$vnode?.parent.componentInstance?.cache)
      if (vm?.$vnode?.componentOptions) {
        var key =
          vm?.$vnode?.key == null
            ? vm?.$vnode?.componentOptions?.Ctor?.cid +
              (vm?.$vnode?.componentOptions?.tag ? `::${vm?.$vnode?.componentOptions?.tag}` : '')
            : vm?.$vnode?.key
        var cache = vm?.$vnode.parent?.componentInstance?.cache
        var keys = vm?.$vnode.parent?.componentInstance?.keys
        if (cache[key]) {
          if (keys.length) {
            var index = keys.indexOf(key)
            if (index > -1) {
              keys.splice(index, 1)
            }
          }
          delete cache[key]
        }
      }
    vm.$destroy()
  }
}
