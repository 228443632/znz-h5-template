/**
 * @Author bianpengfei
 * @create 2020/9/11 16:55
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 50,
      minPixelValue: 2,
      propWhiteList: []
    }
  }
}
