<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useStore } from 'vuex'

const store = useStore()

onLaunch(() => {
  console.log('App launched')
  // 初始化用户信息
  initUserInfo()
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
@tailwind base;
@tailwind components;
@tailwind utilities;
.app {
  min-height: 100vh;
}
</style>
