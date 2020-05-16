<template>
  <div class="dropdown-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      // sync
      type: String,
      default: ''
    }
  },
  inheritAttrs: false, //父组件传递动态数据后，子组件的默认行为
  data() {
    return {}
  },
  mounted() {
    //  this.$emit('tab-click-close')
    this.$on('show', title => {
      this.closeDropdown()
      this.$emit('tab-click-open', title)
    })

    this.$on('close', title => {
      this.$emit('tab-click-close', title)
    })
  },
  methods: {
    // 关闭其他dropitem
    closeDropdown() {
      this.$children.forEach(item => {
        item.close()
      })
    }
  }
}
</script>

<style lang="less" scoped>
@border-color: #f8f8f9;
.dropdown-menu {
  width: 100%;
  height: 0.86rem;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  justify-content: space-between;
  background: #ffffff;
}
.dropdown-item {
  padding: 0 0.3rem;
}
</style>
