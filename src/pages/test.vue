<template>
  <div class="test">
    <van-button @click.stop="$router.push('/index/test')">跳转到index</van-button>
    <van-button type="primary" @click.stop="$router.push('/index/detail/1')">跳转到 详情页 1</van-button>
  </div>
</template>

<script>
export default {
  name: 'index-test'
}
</script>

