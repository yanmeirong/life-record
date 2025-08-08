
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,wxml}'], // 扫描小程序文件
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁用默认样式，避免冲突
  }
}