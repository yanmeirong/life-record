module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'weapp-tailwindcss': {
      // 可选：配置小程序平台，默认支持微信、支付宝、百度等
      platforms: ['weapp', 'alipay', 'swan'],
    },
  },
}