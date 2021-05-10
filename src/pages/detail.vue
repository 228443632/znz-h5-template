<!--
 * @Description:
 * @Author bianpengfei
 * @create 2021/5/10 14:38
 -->
<template>
  <div class="">
    <van-button @click.stop="$router.push('/index/detail/1')">跳转到 详情页 1</van-button>
    <van-button @click.stop="$router.push('/index/detail/2')">跳转到 详情页 2</van-button>
    <br>
    <van-button @click.stop="$router.push('/index')">跳转到 index</van-button>
    <van-button @click.stop="$router.push('/index/test')">跳转到 test</van-button>
    <input/>
  </div>
</template>

<script>
export default {
name: "index-test-detail"
}
</script>

<style scoped>

</style>
