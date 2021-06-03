<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 15:27
 -->
<template>
  <div class="page-index">
    <div class="page__header">
      <van-nav-bar :title="title" left-arrow @click-left="onTabLeft"> </van-nav-bar>
    </div>

    <div class="page__body">
      <!--tabs-->
      <g-gird-type v-model="active" :list="typeList"></g-gird-type>

      <div class="body__content">
        <!--处方-->
        <template v-if="active == 0"> </template>

        <!--报告单-->
        <template v-else-if="active == 1"> </template>

        <!--费用-->
        <template v-else-if="active == 2"> </template>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'

export default {
  name: 'tabs_view_in_patient_record_detail',
  components: {},
  data() {
    return {
      title: '住院记录',
      active: '0',
      typeList: [
        {
          name: '0',
          activeIcon: require('@/assets/detail/bingan_s.png'),
          inActiveIcon: require('@/assets/detail/bingan.png'),
          label: '病例'
        },
        {
          name: '1',
          activeIcon: require('@/assets/detail/bingli_s.png'),
          inActiveIcon: require('@/assets/detail/bingli.png'),
          label: '病历'
        },
        {
          name: '2',
          activeIcon: require('@/assets/detail/baogao_s.png'),
          inActiveIcon: require('@/assets/detail/baogao.png'),
          label: '报告单'
        },
        {
          name: '3',
          activeIcon: require('@/assets/detail/feiyong_s.png'),
          inActiveIcon: require('@/assets/detail/feiyong.png'),
          label: '费用'
        }
      ]
    }
  },
  computed: {
    _tabActive: sync('system/tabActive')
  },
  created() {
    this._tabActive = 0
  },
  mounted() {},

  methods: {
    onTabLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.page-index {
  overflow: hidden;
}
</style>
