<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/6/1 16:06
 -->
<template>
  <div class="page-index">
    <div class="page__header">
      <div class="header__top">
        <div class="header__top-lt">
          <!--男-->
          <template v-if="true">
            <img src="@/assets/home/head_male.png" />
            <img src="@/assets/home/male.png" />
          </template>
          <!--女-->
          <template v-else>
            <img src="@/assets/home/head_famale.png" />
            <img src="@/assets/home/famale.png" />
          </template>
        </div>

        <div class="header__top-rt">
          <div>
            <span>张三</span>
            <span>13岁</span>
          </div>
          <div>
            <span>门诊：0次</span>
            <span>住院：0次</span>
            <span>体检：0次</span>
          </div>
        </div>
      </div>
      <div class="header__bottom"></div>
    </div>
    <div class="page__body" ref="pageBody">
      <div class="body__lt">
        <g-scroll-view-simple :height="`${height}px`" :enabledScrollListener="false">
          <div class="time-stage__item" v-for="(item, index) in nav" :key="index">
            <div class="item__lt">
              <!--            <img />-->
            </div>
            <div class="item__rt">
              <span>
                <span>{{ item.title }}</span>
                <span class="badge">{{ item.value }}</span>
              </span>
              <span>{{ item.subTitle }}</span>
            </div>
          </div>
        </g-scroll-view-simple>
      </div>
      <div class="body__rt">
        <g-scroll-view-simple :height="`calc(${height}px + 0.2rem)`" showScrollBar :enabledScrollListener="false">
          <div
            class="timeline__item"
            v-for="item in 18"
            :key="item"
            @click.stop="$router.push('/out-patient/record-detail/10')"
          >
            <div class="item__lt">
              <img src="@/assets/detail/t-line-year.png" />
            </div>
            <div class="item__rt">
              <div class="year">2020年</div>
              <div class="host-name">刘生玉琴</div>
              <div class="date">2020-10-10</div>
            </div>
          </div>
        </g-scroll-view-simple>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import { Toast } from 'vant'

export default {
  name: 'tabs_view_health_value',

  data() {
    return {
      height: '',
      nav: [
        {
          value: '1',
          title: '婴儿期',
          subTitle: '0-1岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '2',
          title: '幼儿期',
          subTitle: '1-3岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '3',
          title: '学龄前期',
          subTitle: '3-6岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '4',
          title: '学龄期',
          subTitle: '6-12岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '5',
          title: '青春期',
          subTitle: '12-20岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '6',
          title: '青年期',
          subTitle: '20-45岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '7',
          title: '中老年',
          subTitle: '46-60岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        },
        {
          value: '8',
          title: '老年期',
          subTitle: '60-100岁',
          badge: 0,
          activeIcon: require('@/assets/detail/M8-active.png'),
          inActiveIcon: require('@/assets/detail/M8.png')
        }
      ]
    }
  },

  computed: {
    _tabActive: sync('system/tabActive')
  },

  activated() {
    this._tabActive = 1
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      try {
        await this.initElement()
      } catch (e) {
        Toast(e.toString())
      }
    },

    initElement() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.$nextTick(() => {
            const top = this.$refs.pageBody.getBoundingClientRect()?.top ?? 0
            const height = document.querySelector('.main__content').clientHeight
            this.height = height - top
            resolve()
          })
        }, 20)
      })
    }
  }
}
</script>

<style scoped lang="less">
.page-index {
  height: 100%;
  overflow: hidden;
  display: flex;
  background: #fff;
  flex-direction: column;
  .page__header {
    flex-shrink: 0;
    .header__top {
      padding: 0 0.3rem;
      background: url('~@/assets/detail/t-q-t.png');
      height: 1.1rem;
      width: 100%;
      background-size: cover;
      display: flex;
      align-items: center;
      .header__top-lt {
        width: 1rem;
        height: 1rem;
        background: #fff;
        display: block;
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 0.3rem;
        position: relative;
        img:nth-child(1) {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        img:nth-child(2) {
          width: 0.32rem;
          height: 0.32rem;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .header__top-rt {
        display: flex;
        flex: 1;
        justify-content: space-around;
        flex-direction: column;
        div:nth-child(1) {
          line-height: 0.4rem;
          font-size: 0.34rem;
          color: #ffffff;
        }
        div:nth-child(2) {
          font-size: 0.24rem;
          color: rgba(255, 255, 255, 0.8);
          span + span {
            margin-left: 0.6rem;
          }
        }
      }
    }
    .header__bottom {
      background: url('~@/assets/detail/t-q-b.png');
      height: 0.6rem;
      width: 100%;
      background-size: cover;
    }
  }
  .page__body {
    display: flex;
    flex: 1;
    .body__lt {
      width: 3rem;
      flex-shrink: 0;
      .time-stage__item {
        margin-top: 0.52rem;
      }
      .time-stage__item {
        display: flex;
        align-items: center;
        padding: 0.2rem 0.2rem 0.2rem 0.3rem;
        position: relative;
        .click-active--opacity;
        .item__lt {
          height: 0.8rem;
          width: 0.8rem;
          flex-shrink: 0;
          position: relative;
          margin-right: 0.2rem;
          border-radius: 50%;
          background: rgb(210, 243, 212);
          img {
            height: 0.8rem;
            width: 0.8rem;
          }
          &:before {
            content: '';
            position: absolute;
            height: 0.6rem;
            width: 1px;
            background: #e3dddd;
            left: 50%;
            top: -0.76rem;
            transform: translateX(-50%);
          }
        }
        .item__rt {
          display: flex;
          flex: 1;
          height: 0.8rem;
          box-sizing: border-box;
          position: relative;
          justify-content: space-around;
          flex-direction: column;
          span:nth-child(1) {
            font-size: 0.26rem;
            color: #595959;
            display: flex;
            align-items: center;
            .badge {
              display: inline-block;
              width: 0.32rem;
              height: 0.32rem;
              .flex-center;
              color: #fff;
              margin-left: 0.1rem;
              box-sizing: content-box;
              font-size: 0.24rem;
              border-radius: 50%;
              background: @primary-color;
            }
          }
          span:nth-child(2) {
            font-size: 0.24rem;
            color: @sub-color;
          }
        }
      }
      .time-stage__item:nth-child(1) {
        .item__lt {
          &:before {
            height: 0.5rem;
            top: -0.66rem;
          }
        }
      }
    }
    .body__rt {
      flex: 1;
      background: #fff;
      box-shadow: -0.1rem 0 0.1rem -0.1rem rgba(0, 0, 0, 0.08);
      position: relative;
      margin-top: -0.2rem;
      height: calc(100% + 0.2rem);
      padding: 0.2rem 0;
      .timeline__item {
        display: flex;
        padding: 0.1rem 0.3rem 0.22rem;
        .click-active--opacity;
        .item__lt {
          width: 0.36rem;
          margin-right: 0.12rem;
          flex-shrink: 0;
          display: flex;
          justify-content: flex-start;
          position: relative;
          img {
            width: 0.36rem;
            height: 0.36rem;
          }
          &:before {
            content: '';
            position: absolute;
            height: 100%;
            width: 1px;
            background: #e3dddd;
            left: 50%;
            top: 0.36rem;
            transform: translateX(-50%);
          }
        }
        .item__rt {
          flex: 1;
          .year {
            font-weight: 500;
            line-height: 0.36rem;
            font-size: 0.28rem;
            color: @primary-color;
          }
          .host-name {
            padding: 0.04rem 0 0.06rem 0.04rem;
            color: #595959;
            font-size: 0.24rem;
          }

          .date {
            padding-left: 0.04rem;
            color: @sub-color;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
