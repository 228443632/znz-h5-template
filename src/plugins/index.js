/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/14 18:15
 */
/**
 * 注册所有插件
 */
const requireAll = requireContext =>
  requireContext.keys().map(key => {
    if (!['index'].includes(key.replace(/^\.\/(.*)\.\w+$/, '$1'))) {
      requireContext(key)
    }
  })
const pluginsModules = require.context('@/plugins/', true, /\.js$/)
requireAll(pluginsModules)
