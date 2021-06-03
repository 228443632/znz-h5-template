<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 13:14
 -->
<template>
  <div class="page-index">
    <template v-if="initial">
      <g-scroll-view :height="height">
        <section style="padding: 0.28rem 0.3rem">
          <div class="page__header">
            <div class="page__header-top">
              <div class="header-top-lt">
                <template v-if="true">
                  <img src="@/assets/home/head_male.png" />
                  <img src="@/assets/home/male.png" />
                </template>
                <template v-else>
                  <img src="@/assets/home/head_famale.png" />
                  <img src="@/assets/home/famale.png" />
                </template>
              </div>
              <div class="header-top-rt">
                <div>杨林 65岁</div>
                <div>
                  <span>门诊次数：6次</span>
                  <span>住院次数：5次</span>
                </div>
              </div>
            </div>
            <div class="page__header-bottom">
              <div class="row">
                <div class="col">
                  <div class="col-label">既往史</div>
                  <div class="col-text">无</div>
                </div>
                <div class="col">
                  <div class="col-label">婚姻史</div>
                  <div class="col-text">已婚</div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="col-label">家族史</div>
                  <div class="col-text">无</div>
                </div>
                <div class="col">
                  <div class="col-label">个人史</div>
                  <div class="col-text">已婚</div>
                </div>
              </div>
            </div>
          </div>
          <div class="page__body">
            <!--个人信息-->
            <div class="basic-info__wrap">
              <div class="basic-title">个人信息库</div>
              <div class="basic-content">
                <div class="row">
                  <div class="col" style="flex: 2">
                    <div class="icon">
                      <img src="@/assets/home/mobile.png" />
                    </div>
                    <div class="text">
                      <div class="type-label">手机号：</div>
                      <div class="type-value">1321847857</div>
                    </div>
                  </div>
                  <div class="col" style="flex: 3">
                    <div class="icon">
                      <img src="@/assets/home/card.png" />
                    </div>
                    <div class="text">
                      <div class="type-label">身份证：</div>
                      <div class="type-value">320723199503074252</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col" style="flex: 2">
                    <div class="icon">
                      <img src="@/assets/home/csrq.png" />
                    </div>
                    <div class="text">
                      <div class="type-label">出生日期：</div>
                      <div class="type-value">2010-10-10</div>
                    </div>
                  </div>
                  <div class="col" style="flex: 3">
                    <div class="icon">
                      <img src="@/assets/home/ybkh.png" />
                    </div>
                    <div class="text">
                      <div class="type-label">医保卡号：</div>
                      <div class="type-value">32048345*****sdsf</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="record__item" @click.stop="$router.push(`/out-patient/record-list`)">
              <div class="item-lt">
                <img class="icon" src="@/assets/home/mzjl.png" />
              </div>
              <div class="item-rt">
                <div>门诊就诊记录</div>
                <div>查看您的门诊病历历史情况</div>
              </div>
            </div>

            <div class="record__item" @click.stop="$router.push(`/in-patient/record-list`)">
              <div class="item-lt">
                <img class="icon" src="@/assets/home/zyjl.png" />
              </div>
              <div class="item-rt">
                <div>住院就诊记录</div>
                <div>查看您的住院病历历史情况</div>
              </div>
            </div>
          </div>
        </section>
      </g-scroll-view>
    </template>

    <template v-else>
      <skeleton></skeleton>
    </template>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import { Toast } from 'vant'
import Skeleton from './components/skeleton'

export default {
  name: 'tabs_view_home',
  computed: {
    _tabActive: sync('system/tabActive')
  },

  data() {
    return {
      initial: false,
      height: 0
    }
  },

  created() {
    this._tabActive = 0
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      try {
        await this.initElement()
        setTimeout(() => {
          this.initial = true
        }, 300)
      } catch (e) {
        Toast(e.toString())
      }
    },

    initElement() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.height = document.querySelector('.main__content').clientHeight
          resolve()
        })
      })
    }
  },
  components: {
    Skeleton
  }
}
</script>

<style scoped lang="less">
img {
  display: block;
}
.page-index {
  .page__header {
    min-height: 3.3rem;
    border-radius: 0.18rem;
    //background-image: linear-gradient(90deg, rgb(63, 128, 243) 0%, #58baec 100%);
    background: linear-gradient(90deg, #3dadf6, #737bfc);
    position: relative;
    padding: 0 0.3rem;
    color: #fff;
    font-size: 0.26rem;
    .page__header-top {
      box-sizing: border-box;
      padding: 0.4rem 0;
      display: flex;
      align-items: center;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background: #fff;
        bottom: 0;
        //transform: scaleY(0.5);
      }
      .header-top-lt {
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
      .header-top-rt {
        div:first-child {
          font-size: 0.34rem;
          .flex-vertical-center(0.52rem);
        }
        div:nth-child(2) {
          margin-top: 0.06rem;
          span:nth-child(1) {
            margin-right: 0.4rem;
          }
          span:nth-child(2) {
          }
        }
      }
    }
    .page__header-bottom {
      padding: 0.34rem 0.1rem;
      .row + .row {
        margin-top: 0.2rem;
      }
    }
  }
  .page__body {
    padding-top: 0.2rem;
    .basic-info__wrap {
      background: #fff;
      border-radius: 0.16rem;
      .basic-title {
        .flex-vertical-center(0.88rem);
        position: relative;
        border-bottom: 1px solid @border-color;
        font-size: 0.32rem;
        padding: 0 0.3rem;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          height: 0.36rem;
          width: 0.06rem;
          background: @success-color;
        }
      }
      .basic-content {
        padding: 0.3rem 0.2rem;
        .row + .row {
          margin-top: 0.2rem;
        }
        .row {
          height: 0.8rem;
          align-items: center;
          .col {
            .icon {
              width: 0.8rem;
              height: 0.8rem;
              .flex-center;
              img {
                width: auto;
                height: 0.54rem;
              }
            }
            .text {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding-left: 0.2rem;
              box-sizing: border-box;
              .type-label {
                font-size: 0.28rem;
                color: @sub-color;
              }
              .type-value {
                font-size: 0.24rem;
                color: #333;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
    .record__item {
      display: flex;
      .flex-vertical-center(1.26rem);
      padding: 0 0.2rem;
      margin: 0.2rem 0;
      border-radius: 0.16rem;
      box-sizing: border-box;
      background: #fff;
      .click-active--opacity;
      .item-lt {
        width: 0.76rem;
        height: 0.76rem;
        margin-right: 0.2rem;
        flex-shrink: 0;
        img {
          width: 0.76rem;
          height: 0.76rem;
          border-radius: 50%;
        }
      }
      .item-rt {
        height: 0.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 0.28rem;
          color: #000;
        }
        div:nth-child(2) {
          padding-top: 0.04rem;
          font-size: 0.24rem;
          color: @sub-color;
        }
      }
    }
  }
  .row {
    width: 100%;
    display: flex;
    .col {
      display: flex;
      flex: 1;
      &-label {
        width: 1rem;
      }
      &-text {
        flex: 1;
      }
    }
  }
}
</style>
