<template> </template>
<script>
export default {
  methods: {
    // 分享
    onShareClick() {
      var version = this.rnInfo.version
      console.log('version', parseInt(version.split('.').join('')))
      var info = {
        route: 'share',
        shareIcon:
          'https://cdn.yuque.com/yuque/assets/189253/slices/1551238178534-f7f6ad37-8d77-4484-a7b6-e6ee5c4dff7c.png',
        shareTitle: '',
        shareLink: '',
        shareText: ''
      }
      if (parseInt(version.split('.').join('')) >= 120) {
        info.shareTypeArr = [2, 3, 1, 5]
      }
      console.log(JSON.stringify(info))
      window.postMessage(JSON.stringify(info))
    },
    // 跳登录
    onLogin() {
      var info = {
        route: 'login',
        url: window.location.href
      }
      window.postMessage(JSON.stringify(info))
    },
    // 新开webview
    openNewWebview() {
      if (parseInt(this.rnInfo.version.split('.').join('')) >= 120) {
        var obj = {
          url: `${global.baseUrl}/major?id=${id}&barColor=#2EAEBB`,
          route: 'webView',
          title: '专业详情'
        }
        window.postMessage(JSON.stringify(obj))
      } else {
        window.location.href = `${global.baseUrl}/major?id=${id}`
      }
    },
    // meiqia
    onKefuClick() {
      var info = {
        //客户的数据
        comment: this.rnInfo.deviceId,
        name: this.mqInfo.name
      }
      var jInfo = JSON.stringify(info)
      var messageObj = {
        route: 'meiqia',
        info: jInfo
      }
      console.log(jInfo)
      window.postMessage(JSON.stringify(messageObj))
    }
  }
}
</script>
