/**
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/14 18:15
 */
import Vue from 'vue'

const prefix = 'g-'
const requireComponent = require.context('@/components/', true, /\.vue$/)
requireComponent.keys().forEach(file => {
  const componentConfig = requireComponent(file)
  if (componentConfig.default.name) {
    const componentName = componentConfig.default.name?.toString?.()?.startsWith?.(prefix)
      ? `${componentConfig.default.name}`
      : `${prefix}${componentConfig.default.name}`
    Vue.component(`${componentName}`, componentConfig.default || componentConfig)
  }
})
