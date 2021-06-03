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

    <div class="page__body" ref="pageBody">
      <g-scroll-view-simple :height="`${height}px`" ref="scrollViewSimple">
        <section class="body__container">
          <!--tabs-->
          <g-gird-type v-model="active" :list="typeList"></g-gird-type>

          <div class="body__content">
            <!--处方-->
            <template v-if="active == 0">
              <!--基本信息-->
              <van-collapse v-model="activeNames_1" style="margin-top: 0.2rem">
                <van-collapse-item name="1">
                  <template #title>
                    <div class="collapse__title">基本信息</div>
                  </template>
                  <div class="basic-row">
                    <div class="row-label">日期</div>
                    <div class="row-value">2019年10月10日</div>
                  </div>
                  <div class="basic-row">
                    <div class="row-label">科别</div>
                    <div class="row-value">口腔一科</div>
                  </div>
                  <div class="basic-row">
                    <div class="row-label">处方号</div>
                    <div class="row-value">2336234</div>
                  </div>
                  <div class="basic-row">
                    <div class="row-label">处方金额</div>
                    <div class="row-value">181.39元</div>
                  </div>
                </van-collapse-item>

                <!--临床诊断-->
                <van-collapse-item name="2" style="margin-top: 0.2rem">
                  <template #title>
                    <div class="collapse__title">临床诊断</div>
                  </template>
                </van-collapse-item>

                <!--处方RP-->
                <van-collapse-item name="3" style="margin-top: 0.2rem">
                  <template #title>
                    <div class="collapse__title">处方RP</div>
                  </template>
                  <van-empty description="数据为空" />
                </van-collapse-item>
              </van-collapse>
            </template>

            <!--报告单-->
            <template v-else-if="active == 1">
              <div class="report__wrap">
                <van-sticky offset-top="0.9rem" @change="onChangeSticky">
                  <van-tabs v-model="report.active" color="#07c160">
                    <van-tab title="检查报告"></van-tab>
                    <van-tab title="检验报告"></van-tab>
                  </van-tabs>
                </van-sticky>

                <div class="report__body">
                  <!--检查报告-->
                  <div v-show="report.active == 0">
                    <van-collapse v-model="activeNames_2">
                      <van-collapse-item :name="item" v-for="item in 10" :key="item" style="margin-top: 0.2rem">
                        <template #title>
                          <is-repect-report-item></is-repect-report-item>
                        </template>
                        <div style="padding: 0.1rem 0">
                          变更日志： v2.3.2（11/24/2020） 计算正确的平均尺寸 v2.3.1（07/25/2020）
                          修复TypeError：无法获取未定义或空引用的属性’slotHeaderSize’ 当“ keeps”改变时对更新的响应
                          v2.3.0（06/18/2020） 错误修正
                        </div>
                      </van-collapse-item>
                    </van-collapse>
                  </div>

                  <!--检验报告-->
                  <div v-show="report.active == 1">
                    <van-collapse v-model="activeNames_3">
                      <van-collapse-item :name="item" v-for="item in 2" :key="item" style="margin-top: 0.2rem">
                        <template #title>
                          <is-repect-report-item></is-repect-report-item>
                        </template>
                        <div style="padding: 0.1rem 0">
                          变更日志： v2.3.2（11/24/2020） 计算正确的平均尺寸 v2.3.1（07/25/2020）
                          修复TypeError：无法获取未定义或空引用的属性’slotHeaderSize’ 当“ keeps”改变时对更新的响应
                          v2.3.0（06/18/2020） 错误修正
                        </div>
                      </van-collapse-item>
                    </van-collapse>
                  </div>
                </div>
              </div>
            </template>

            <!--费用-->
            <template v-else-if="active == 2">
              <div class="fee__wrap">
                <div class="fee__item">
                  <div class="fee__item-label">总费用</div>
                  <div class="fee__item-value">1000元</div>
                </div>

                <div class="fee__item feel__item-other">
                  <div class="fee__item-label">其他</div>
                  <div class="fee__item-value">100元</div>
                </div>
              </div>
            </template>
          </div>
        </section>
      </g-scroll-view-simple>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import IsRepectReportItem from './components/ispect-report-item'

export default {
  name: 'tabs_view_out_patient_record_detail',
  components: {
    IsRepectReportItem
  },
  data() {
    return {
      title: '门诊就诊记录',
      active: '0',
      height: '',
      container: null,
      activeNames_1: ['1', '2', '3'], // 处方
      activeNames_2: [], // 检查报告
      activeNames_3: [], // 检验报告
      typeList: [
        {
          name: '0',
          activeIcon: require('@/assets/detail/chufang_s.png'),
          inActiveIcon: require('@/assets/detail/chufang.png'),
          label: '处方'
        },
        {
          name: '1',
          activeIcon: require('@/assets/detail/baogao_s.png'),
          inActiveIcon: require('@/assets/detail/baogao.png'),
          label: '报告单'
        },
        {
          name: '2',
          activeIcon: require('@/assets/detail/feiyong_s.png'),
          inActiveIcon: require('@/assets/detail/feiyong.png'),
          label: '费用'
        }
      ],

      report: {
        // 报告单
        active: 0
      }
    }
  },
  computed: {
    _tabActive: sync('system/tabActive')
  },
  created() {
    this._tabActive = 0
  },
  mounted() {
    this.init()

    console.log(this.$refs.scrollViewSimple?.$el, this.$refs.scrollViewSimple?.$el?.querySelector('.scroll-view'))
  },

  methods: {
    async init() {
      try {
        await this.initElement()
        await this.getList()
      } catch (e) {
        // Toast(e.toString())
      }
    },

    initElement() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          const top = this.$refs.pageBody.getBoundingClientRect().top
          this.height = document.querySelector('.main__content').clientHeight - top
          this.container = this.$refs.scrollViewSimple?.$el
          resolve()
        })
      })
    },

    /*吸顶发生变化*/
    onChangeSticky(isFixed) {
      const el = document.querySelector('.report__wrap .van-sticky')
      if (!el || el?.nodeType != 1) return
      console.log(isFixed)
      if (isFixed) {
        // document.querySelector('.van-nav-bar').style.boxShadow = 'none'
        el.style.borderBottom = '0.06rem solid #f7f7f7'
      } else {
        // document.querySelector('.van-nav-bar').style.boxShadow = '0 0.04rem 0.1rem rgba(0,0,0,0.08)'
        el.style.borderBottom = 'none'
      }
    },

    onTabLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.page-index {
  overflow: hidden;
  .body__container {
    padding: 0.2rem 0.3rem;
    ::v-deep .van-collapse {
      .van-collapse-item__title {
        display: flex;
        align-items: center;
        padding: 0 0.3rem 0 0;
        .van-cell__right-icon {
          font-size: 0.24rem;
        }
      }
      .van-collapse-item__content {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .collapse__title {
      .flex-vertical-center(0.88rem);
      position: relative;
      font-size: 0.32rem;
      padding: 0 0.3rem;
      justify-content: space-between;
      color: @primary-color;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        height: 0.32rem;
        width: 0.06rem;
        background: @success-color;
      }
    }
    .basic-row {
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem;
      height: 0.88rem;
      align-items: center;
      font-size: 0.28rem;
      position: relative;
      .row-label {
        color: #646566;
      }
      .row-value {
        color: @sub-color;
      }
      &:before {
        content: '';
        height: 1px;
        background: @border-color;
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: scaleY(0.5);
      }
    }

    .report__wrap {
      padding-top: 0.2rem;
      box-sizing: border-box;
      min-height: calc(100vh - 1.8rem);
      ::v-deep .van-sticky--fixed {
        padding: 0 0.3rem;
        background: #fff;
      }
      ::v-deep .van-tabs__wrap {
        width: 100%;
        .van-tab--active {
          .van-tab__text {
            color: @success-color;
          }
        }

        .van-tabs__line {
          background: @success-color;
          width: 0.4rem;
          height: 0.08rem;
        }
      }
      .report__body {
        margin-top: 0.2rem;
      }
    }

    .fee__wrap {
      padding-top: 0.2rem;
      .fee__item {
        .flex-vertical-center(0.88rem);
        position: relative;
        justify-content: space-between;
        background: #fff;
        padding: 0 0.3rem 0 0.3rem;
        font-size: 0.32rem;
        color: @primary-color;
        margin-bottom: 0.2rem;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          height: 0.32rem;
          width: 0.06rem;
          background: @success-color;
        }
        &-value {
          padding: 0.02rem 0.2rem;
          border-radius: 0.08rem;
          background: lighten(@primary-color, 40%);
        }
        &.feel__item-other {
          margin-bottom: 0.12rem;
        }
      }
    }
  }
}
</style>
