<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 17:55
 -->
<template>
  <div class="filter__wrap">
    <g-scroll-view-simple height="100%">
      <div class="wrap-container">
        <img src="@/assets/detail/filter-del.png" class="icon-del" @click.stop="$emit('update:visible', false)"/>
        <div class="filter__title">选择医院</div>
        <div class="host__item-wrap">
          <div class="host__item" v-for="item in filter.host" :key="item.value">
            {{ item.name }}
          </div>
        </div>
        <div class="filter__title">选择类型</div>
        <div class="type__item-wrap">
          <div
            :class="{ type__item: true, 'type__item--active': item.value == 1 }"
            v-for="item in filter.type"
            :key="item.value"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="filter__title">选择时间</div>
        <div class="type__item-wrap">
          <div
            :class="{ type__item: true, 'type__item--active': item.value == 1 }"
            v-for="item in filter.time"
            :key="item.value"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="divider"></div>
      </div>
    </g-scroll-view-simple>

    <div class="btn-submit">
      <div>确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filter: {
        host: [
          {
            value: 1,
            name: '合肥第一人民医院'
          },
          {
            value: 2,
            name: '合肥市滨湖医院'
          },
          {
            value: 3,
            name: '合肥第二人民医院'
          },
          {
            value: 4,
            name: '合肥第三人民医院'
          }
        ],
        type: [
          {
            value: 1,
            name: '门诊'
          },
          {
            value: 2,
            name: '住院'
          }
        ],
        time: [
          {
            value: 1,
            name: '一周'
          },
          {
            value: 2,
            name: '一个月'
          },
          {
            value: 3,
            name: '三个月'
          },
          {
            value: 4,
            name: '半年'
          },
          {
            value: 5,
            name: '一年'
          },
          {
            value: 6,
            name: '三年'
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
.filter__wrap {
  padding: 0.24rem 0 0;
  font-size: 0.26rem;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .wrap-container {
    padding: 0 0.3rem;
    position: relative;
    flex: 1;
    .icon-del {
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      right: 0.3rem;
      top: 0;
    }
    .filter__title {
      font-size: 0.32rem;
      color: @sub-color;
      padding: 0.24rem 0;
    }
    .host__item-wrap {
      margin-top: -0.14rem;
      .host__item {
        font-weight: 500;
        padding: 0.14rem 0;
        .flex-center;
        color: #000;
      }
    }
    .type__item-wrap {
      display: flex;
      flex-wrap: wrap;
      .type__item {
        width: calc((100% - 0.34rem * 2) / 3);
        height: 0.7rem;
        border-radius: 0.1rem;
        .flex-center;
        font-size: 0.28rem;
        box-sizing: border-box;
        color: #333;
        background: rgb(221, 221, 221);
        margin: 0 0.34rem 0.3rem 0;
      }
      .type__item:nth-child(3n) {
        margin-right: 0;
      }
      .type__item--active {
        //background: rgb(238, 241, 252);
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }
    }
    .divider {
      margin: 0.1rem 0 0.4rem 0;
      width: 100%;
      height: 1px;
      background: @border-color;
    }
  }
  .btn-submit {
    margin: 0 0.3rem;
    font-size: 0.32rem;
    box-sizing: border-box;
    padding: 0.24rem 0;
    color: #fff;
    flex-shrink: 0;
    div {
      height: 0.8rem;
      width: 100%;
      background: @primary-color;
      border-radius: 0.2rem;
      .flex-center;
    }
  }
}
</style>
