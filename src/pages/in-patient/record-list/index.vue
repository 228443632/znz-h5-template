<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/30 15:27
 -->
<template>
  <div class="page-index" ref="container">
    <div class="page__header">
      <van-nav-bar :title="title" left-arrow @click-left="onTabLeft" @click-right="onTabRight">
        <template #right>
          <div class="tab-right__text">
            <van-icon name="search" size="0.32rem" color="#595959" />
            <span>筛选</span>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div class="page__body" ref="pageBody">
      <g-scroll-view-simple :height="`${height}px`" @on-scroll-to-bottom="onScrollToBottom">
        <section class="scroll-view-body">
          <template v-if="!list.length && params.loading && !params.end"></template>
          <template v-else>
            <template v-if="list.length">
              <record-list
                v-for="item in 30"
                :key="item"
                @click.stop.native="$router.push(`/in-patient/record-detail/${item}`)"
              ></record-list>
              <g-loading-end
                :end="params.end && !params.loading"
                :loading="!params.end && params.loading"
                :text="list.length"
              ></g-loading-end>
            </template>

            <template v-else>
              <van-empty image="search" description="数据为空" />
            </template>
          </template>
        </section>
      </g-scroll-view-simple>
    </div>

    <van-popup v-model="visible.filter" position="top" :style="{ height: 'calc(100% - 1rem)' }">
      <filter-view></filter-view>
    </van-popup>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import RecordList from './components/record-item'
import FilterView from './components/filter'

export default {
  name: 'tabs_view_in_patient_record_list',
  components: {
    RecordList,
    FilterView
  },
  data() {
    return {
      title: '住院就诊记录',
      height: '',
      visible: {
        filter: false
      },
      params: {
        page: 1,
        size: 15,
        loading: true,
        end: false
      },
      list: [{}]
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
          resolve()
        })
      })
    },

    onTabLeft() {
      this.$router.back()
    },

    onTabRight() {
      this.visible.filter = true
    },

    getList() {},

    onScrollToBottom() {
      if (this.params.end) return
      this.params.page++
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.page-index {
  overflow: hidden;
  .tab-right__text {
    height: 100%;
    .flex-center;
    color: #595959;
    font-weight: 500;
    font-size: 0.32rem;
  }
  .scroll-view-body {
    padding: 0.16rem 0.3rem 0;
  }
}
</style>
