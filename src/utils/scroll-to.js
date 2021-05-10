/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param el
 * @param {number} amount
 */
function move(el, amount) {
  if (el) {
    el.scrollTop = amount
  } else {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }
}

function position(el) {
  if (el) {
    return el.scrollTop
  }
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param el
 * @param {number} amount
 */
function moveLeft(el, amount) {
  if (el) {
    el.scrollLeft = amount
  } else {
    document.documentElement.scrollLeft = amount
    document.body.parentNode.scrollLeft = amount
    document.body.scrollLeft = amount
  }
}

function positionLeft(el) {
  if (el) {
    return el.scrollLeft
  }
  return document.documentElement.scrollLeft || document.body.parentNode.scrollLeft || document.body.scrollLeft
}

/**
 * 获取dom在滚动区域绝对位置
 * @param el dom节点属性（id、class）或 目标dom元素
 * @param elWrap 滚动dom节点
 * @param offsetTop 偏移量
 * */
export const getOffsetTop = (el, elWrap, offsetTop = 0) => {
  if (!el || !elWrap) return 0
  if (typeof el == 'string') {
    el = document.querySelector(el)
  }
  if (typeof elWrap == 'string') {
    elWrap = document.querySelector(elWrap)
  }
  if (!el || !elWrap) return 0
  const elRect = el.getBoundingClientRect()
  const elWrapRect = elWrap.getBoundingClientRect()
  return ~~elRect.top - ~~elWrapRect.top + ~~elWrap.scrollTop - ~~offsetTop
}

/**
 * 垂直滚动
 * @param el domElement  滚动的dom
 * @param {number}start 起始位置 默认是 scrollTop
 * @param {number} to  滑动末端位置
 * @param {number} duration  滚动持续时间
 * @param {Function} callback  结束回调事件
 */
export const scrollToTop = (el, start = 0, to, duration = 500, callback) => {
  start = position(el) || 0
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = typeof duration === 'undefined' ? 500 : duration
  var animateScroll = function () {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(el, val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}

/**
 * 水平滚动
 * @param el domElement
 * @param {number}start
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export const scrollToLeft = (el, start = 0, to, duration = 500, callback) => {
  start = positionLeft(el) || 0
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = typeof duration === 'undefined' ? 500 : duration
  var animateScroll = function () {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    moveLeft(el, val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}

/**
 * 获取当前元素在哪个父元素滚动视图
 * @param targetElement 目标元素
 * @param scrollView
 * @returns {{}}
 */
export const getParentIsScrollView = (targetElement = null, scrollView = { el: null }) => {
  if (['BODY', 'HTML'].includes(targetElement?.tagName)) {
    scrollView.el = targetElement
  } else if (targetElement && getComputedStyle(targetElement)?.overflowY == 'auto') {
    scrollView.el = targetElement
  } else if (targetElement?.parentElement) {
    getParentIsScrollView(targetElement.parentElement, scrollView)
  }
  return scrollView
}
