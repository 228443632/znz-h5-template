<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-6">
    <md-tab-bar v-model="current" :items="items" @change="onTabChange"></md-tab-bar>
    <md-swiper
      ref="swiper"
      :autoplay="0"
      :is-prevent="false"
      :is-loop="false"
      :has-dots="false"
      :ink-length="20"
      @before-change="onSwiperChange"
    >
      <md-swiper-item>
        <div class="md-example-child-scroll-view">
          <md-scroll-view
            ref="scrollView"
            @scroll="$_onScroll"
          >
            <div
              v-for="i in list"
              class="scroll-view-item"
              :key="i"
              @click="$_onItemClick(i)"
            >
              {{i}}
            </div>
          </md-scroll-view>
        </div>
      </md-swiper-item>
      <md-swiper-item>
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import { TabBar, Swiper, SwiperItem } from 'mand-mobile'

import {ScrollView, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '手势切换',
  titleEnUS: 'Gesture switching',
  /* DELETE */
  data() {
    return {
      current: 0,
      items: [
        { name: 0, label: '标签1' },
        { name: 1, label: '标签2' }
      ],
      list: 1000,
    }
  },
  methods: {
    onSwiperChange(from, to) {
      this.current = to
    },
    onTabChange(item, index) {
      this.$refs.swiper.goto(index)
    }
  }
}
</script>

<style lang="less">
.md-example-child-tab-bar-6 .md-swiper {
  background: #fff;
}
.md-example-child-tab-bar-6 .md-swiper .md-swiper-item {
  padding: 20px;
  box-sizing: border-box;
  font-size: 24px;
  line-height: 1.5;
  color: #666;
}
  .md-example-child-scroll-view {
    height: 60vh;
  }
</style>
