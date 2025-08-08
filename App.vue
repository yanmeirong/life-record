<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useStore } from 'vuex'
// import 'uni-icons'


const store = useStore()

onLaunch(() => {
  console.log('App launched')
  // 初始化用户信息
  initUserInfo()
  // 动态加载 iconfont.js
  // 动态加载 iconfont.js
  const script = document.createElement('script');
  script.src = '/static/icons/iconfont.js';
  script.onload = () => {
    console.log('Iconfont loaded successfully');
  };
  script.onerror = (error) => {
    console.error('Failed to load iconfont:', error);
  };
  document.head.appendChild(script);
})

onShow(() => {
  console.log('App showed')
})

onHide(() => {
  console.log('App hide')
})

const initUserInfo = () => {
  const userInfo = uni.getStorageSync('userInfo')
  console.log(userInfo,'userInfo')
  if (userInfo) {
    store.dispatch('user/setUserInfo', userInfo)
	  
  }else{
	  uni.navigateTo({
	  	url:"/pages/login/login"
	  })
  }
}

</script>

<style lang="scss">
@import './styles/common.scss';
@import url('/static/icons/iconfont.css');
/* 移除 @tailwind 指令，改为导入编译后的 CSS */
@import './styles/tailwind.css'; /* 假设我们会生成这个文件 */
.app {
  min-height: 100vh;
}
</style>
