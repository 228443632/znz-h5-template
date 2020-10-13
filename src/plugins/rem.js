/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //兼容现有的设计规范 iphone678->1rem=50px 设计稿px值/100=rem值
      if (clientWidth > 450) {
        docEl.style.fontSize = '50px'
      } else if (clientWidth < 320) {
        docEl.style.fontSize = (320 / 75) * 10 + 'px'
      } else {
        docEl.style.fontSize = (clientWidth / 75) * 10 + 'px'
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
