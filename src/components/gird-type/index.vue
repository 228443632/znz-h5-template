<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 16:31
 -->
<template>
  <div class="type__wrap">
    <div
      :class="{ type__item: true, 'type__item--active': item.name == value }"
      v-for="item in list"
      :key="item.name"
      @click.stop="onChoose(item)"
    >
      <template v-if="item.name == value">
        <img :src="item.activeIcon" />
      </template>
      <template v-else>
        <img :src="item.inActiveIcon" />
      </template>
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gird-type',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    list: {
      type: Array,
      default: () => [{ name: '0', activeIcon: '', inActiveIcon: '', label: '处方' }]
    }
  },
  model: {
    event: 'setValue',
    prop: 'value'
  },

  watch: {
    value: {
      handler(newValue, oldValue) {
        this.$emit('onChange', newValue)
      }
    }
  },

  methods: {
    onChoose(val) {
      this.$emit('setValue', val.name)
    }
  }
}
</script>

<style scoped lang="less">
.type__wrap {
  display: flex;
  align-items: center;
  height: 1.76rem;
  background: #fff;
  border-radius: 0.16rem;
  .type__item + .type__item {
    border-left: 1px solid @border-color;
  }
  .type__item {
    flex: 1;
    .flex-center;
    flex-direction: column;
    img {
      width: auto;
      height: 0.5rem;
    }
    div:nth-child(2) {
      padding-top: 0.06rem;
      color: @content-color;
      font-size: 0.28rem;
    }
    &.type__item--active {
      div:nth-child(1) {
        background: @success-color;
      }
    }
  }
}
</style>
