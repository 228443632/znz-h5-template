<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/10 14:05
 -->
<template>
  <div class="tab-view">
    <app-view class="tab-router-view"></app-view>
    <!--tabs-->
    <van-tabbar v-model="_tabActive" class="tab-bottom-bar" :fixed="false" @change="onChange">
      <van-tabbar-item v-for="(item, index) in tabs" :key="index" :replace="item.replace" :to="item.to">
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inActiveIcon" />
        </template>
        {{ item.label }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import AppView from '@/layout/default/app-view'
export default {
  name: 'default-layout',
  components: {
    AppView
  },
  data() {
    return {
      tabs: [
        {
          label: '首页',
          activeIcon: require('@/assets/tabbar/tabbar-sy-active.png'),
          inActiveIcon: require('@/assets/tabbar/tabbar-sy.png'),
          replace: true,
          to: '/home'
        },
        {
          label: '健康值',
          activeIcon: require('@/assets/tabbar/tabbar-jkz-active.png'),
          inActiveIcon: require('@/assets/tabbar/tabbar-jkz.png'),
          replace: true,
          to: '/health-value'
        },
        {
          label: '基础档案',
          activeIcon: require('@/assets/tabbar/tabbar-jcda-active.png'),
          inActiveIcon: require('@/assets/tabbar/tabbar-jcda.png'),
          replace: true,
          to: '/basic-archives'
        }
      ]
    }
  },
  computed: {
    _tabActive: sync('system/tabActive')
  },

  methods: {
    onChange(index) {}
  }
}
</script>

<style scoped lang="less">
.tab-view {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .tab-router-view {
    flex: 1;
    overflow: hidden;
  }
  .tab-bottom-bar {
    flex-shrink: 0;
  }
}
</style>
