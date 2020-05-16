<template>
  <div class="skeleton-wrapper">
    <div v-if="initial" class="skeleton pointer-stop">
      <!--头像-->
      <section class="skeleton__header" v-if="avatar">
        <span class="skeleton-avatar" :class="animate ? `skeletons-animate-smooth` : ''"></span>
      </section>
      <section class="skeleton__content">
        <!--标题-->
        <h3
          v-if="title"
          class="skeleton__title"
          :class="animate ? `skeletons-animate-${animateType}` : ''"
          :style="{ width: titleWidth }"
        ></h3>
        <!--段落-->
        <ul class="skeleton__paragraph" v-if="paragraph" :style="{ marginTop: rows == 1 ? '0' : '28px' }">
          <li
            v-for="(item, index) in rows"
            :class="animate ? `skeletons-animate-${animateType}` : ''"
            :style="{
              width: rows == 1 ? '100%' : index == rows - 1 ? lastParagraphWidth : '100%'
            }"
            :key="item"
          ></li>
        </ul>
      </section>
    </div>

    <div v-else>
      <!--子组件插槽-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * 骨架屏
 * */
export default {
  props: {
    animate: {
      // 是否展示动画效果， 默认是展开
      type: Boolean,
      default: true
    },
    initial: {
      // 是否显示占位图，传false时会展示子组件内容
      type: Boolean,
      default: true
    },
    avatar: {
      // 是否显示头像占位图，默认显示
      type: Boolean,
      default: true
    },
    title: {
      // 是否显示标题占位图，默认显示
      type: Boolean,
      default: true
    },
    animateType: {
      // 动画类型  smooth表面颜色滑动  width宽度变化
      type: String,
      default: 'smooth'
    },
    paragraph: {
      // 是否显示段落占位图，默认显示
      type: Boolean,
      default: true
    },
    rows: {
      // 设置段落占位图的行数
      type: Number,
      default: 3
    },
    titleWidth: {
      // 标题占位图宽度
      type: String,
      default: '40%'
    },
    lastParagraphWidth: {
      // 标题占位图宽度
      type: String,
      default: '61%'
    }
  },

  mounted() {
    this.$init()
  },

  methods: {
    $init() {}
  }
}
</script>

<style scoped lang="less">
@background-color: #f2f2f2;

.skeleton-wrapper {
  width: 100%;
}

.skeleton {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  .skeleton__header {
    padding-right: 20px;
    flex-shrink: 0;
    .skeleton-avatar {
      display: inline-block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
  .skeleton__content {
    width: 100%;
    vertical-align: top;
    .skeleton__title {
      height: 16px;
      margin-top: 14px;
      background: @background-color;
    }
    .skeleton__paragraph {
      width: 100%;
      margin-top: 28px;
      li {
        height: 16px;
        list-style: none;
        background: #f2f2f2;
      }
      li + li {
        margin-top: 16px;
      }
    }
  }
}
.skeleton--bg-color {
  background-color: @background-color;
}
.skeletons-animate-smooth {
  position: relative;
  display: block;
  overflow: hidden;
  height: 100%;
  background-color: @background-color;
}
.skeletons-animate-smooth:empty::after {
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(216, 216, 216, 0.753), transparent);
  animation: loading 1.5s infinite linear;
}

.skeletons-animate-width {
  background: linear-gradient(90deg, transparent, rgba(216, 216, 216, 0.753), transparent);
  animation: loading-width 1.5s infinite linear;
}

/* 阻止Skeletons点击事件 */
.pointer-stop {
  pointer-events: none;
}

@keyframes loading {
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

@keyframes loading-width {
  0% {
    width: 20%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 20%;
  }
}

@media screen and (min-width: 1800px) {
}

@media screen and (min-width: 0) and (max-width: 1800px) {
}

/*

.skeleton--background-image {
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(216, 216, 216, 0.753),
    transparent
  );
}
 */
</style>
