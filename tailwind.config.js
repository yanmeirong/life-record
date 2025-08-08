module.exports = {
  content: ['./pages/**/*.{vue,js,ts,jsx,tsx,wxml}', './components/**/*.{vue,js,ts,jsx,tsx,wxml}'], // 修改为正确的路径
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁用默认样式，避免冲突
  }
}