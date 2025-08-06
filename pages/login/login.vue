<template>
  <view class="login-page">
    <!-- 顶部Logo区域 -->
    <view class="login-header">
      <view class="logo">
        <text class="logo-icon">📝</text>
      </view>
      <view class="title">生活记录</view>
      <view class="subtitle">记录美好生活的每一刻</view>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <!-- 用户名输入 -->
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">👤</text>
          <input 
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            @input="handleInput('username', $event)"
            :focus="focusField === 'username'"
            @focus="setFocus('username')"
            @blur="setFocus('')"
          />
        </view>
      </view>

      <!-- 密码输入 -->
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">🔒</text>
          <input 
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            @input="handleInput('password', $event)"
            :focus="focusField === 'password'"
            @focus="setFocus('password')"
            @blur="setFocus('')"
          />
          <text 
            class="toggle-btn" 
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '隐藏' : '显示' }}
          </text>
        </view>
      </view>

      <!-- 错误提示 -->
      <view v-if="errorMsg" class="error-message">
        {{ errorMsg }}
      </view>

      <!-- 登录按钮 -->
      <button 
        class="login-btn"
        :loading="loading"
        :disabled="!canLogin || loading"
        @click="handleLogin"
      >
        登录
      </button>

      <!-- 其他登录方式 -->
      <view class="other-login">
        <view class="line"></view>
        <view class="text">其他登录方式</view>
        <view class="line"></view>
      </view>

      <view class="social-login">
        <button 
          class="social-btn" 
          open-type="getUserInfo" 
          @getuserinfo="handleWechatLogin"
        >
          <text class="icon">微信登录</text>
        </button>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <view class="test-account" v-if="showTestAccount">
        <text>测试账号: test / 123456</text>
        <text class="close-btn" @click="showTestAccount = false">×</text>
      </view>
      <view class="copyright">
        © 2024 生活记录 版权所有
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'

// 注意：移除了从@dcloudio/uni-app的导入，直接使用全局uni对象

// 响应式数据
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const showPassword = ref(false)
const focusField = ref('')
const showTestAccount = ref(true)
const router = useRouter()

// 计算属性 - 判断是否可以登录
const canLogin = computed(() => {
  return username.value.trim().length > 0 && password.value.trim().length > 0
})

// 处理输入
const handleInput = (field, e) => {
  if (field === 'username') {
    username.value = e.detail.value.trim()
  } else {
    password.value = e.detail.value.trim()
  }
  // 输入时清除错误提示
  if (errorMsg.value) {
    errorMsg.value = ''
  }
}

// 设置输入框焦点状态
const setFocus = (field) => {
  focusField.value = field
}

// 检查是否已登录
const checkLoginStatus = () => {
  // 直接使用uni.getStorageSync，无需导入
  const token = uni.getStorageSync('token')
  if (token) {
    // 已登录，跳转到首页
    uni.switchTab({ url: '/pages/life/life' })
    return true
  }
  return false
}

// 账号密码登录
const handleLogin = async () => {
  // 前端验证
  if (!username.value.trim()) {
    errorMsg.value = '请输入用户名'
    return
  }
  if (!password.value.trim()) {
    errorMsg.value = '请输入密码'
    return
  }

  try {
    loading.value = true
    errorMsg.value = ''

    // 调用登录接口
    const res = await request.post('/api/v1/auth/login', {
      username: username.value.trim(),
      password: password.value.trim()
    })

    if (res.code === 200) {
      // 登录成功，保存token和用户信息
      uni.setStorageSync('token', res.data.token)
      uni.setStorageSync('userInfo', res.data.user)

      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转
      setTimeout(() => {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          uni.navigateBack({ delta: 1 })
        } else {
          uni.switchTab({ url: '/pages/life/life' })
        }
      }, 1500)
    } else {
      errorMsg.value = res.message || '登录失败，请重试'
    }
  } catch (err) {
    errorMsg.value = err.message || '网络异常，请检查网络连接'
  } finally {
    loading.value = false
  }
}

// 微信快捷登录
const handleWechatLogin = async (e) => {
  try {
    loading.value = true
    errorMsg.value = ''

    // 获取用户信息
    const userInfo = e.detail.userInfo
    if (!userInfo) {
      errorMsg.value = '请授权用户信息'
      return
    }

    // 调用微信登录接口获取code
    const loginRes = await new Promise((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: resolve,
        fail: reject
      })
    })

    // 调用后端微信登录接口
    const res = await request.post('/api/v1/auth/wechat-login', {
      code: loginRes.code,
      userInfo: userInfo
    })

    if (res.code === 200) {
      // 登录成功处理，同上
      uni.setStorageSync('token', res.data.token)
      uni.setStorageSync('userInfo', res.data.user)

      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      setTimeout(() => {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          uni.navigateBack({ delta: 1 })
        } else {
          uni.switchTab({ url: '/pages/life/life' })
        }
      }, 1500)
    } else {
      errorMsg.value = res.message || '微信登录失败'
    }
  } catch (err) {
    errorMsg.value = err.message || '微信登录异常'
  } finally {
    loading.value = false
  }
}

// 页面挂载时检查登录状态
onMounted(() => {
  // 延迟检查，避免页面切换过快
  const timer = setTimeout(() => {
    checkLoginStatus()
  }, 500)
  
  onUnmounted(() => {
    clearTimeout(timer)
  })
})
</script>

<style scoped lang="scss">
/* 样式部分保持不变 */
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f8fa;
  padding: 0 30rpx;
}

// 头部样式
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0 60rpx;

  .logo {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background-color: #07c160;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;

    .logo-icon {
      font-size: 70rpx;
    }
  }

  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 15rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
  }
}

// 表单样式
.login-form {
  flex: 1;
  width: 100%;
  max-width: 500rpx;
  margin: 0 auto;

  .form-item {
    margin-bottom: 30rpx;

    .input-wrapper {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 80rpx;
      padding: 0 30rpx;
      height: 90rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

      .icon {
        font-size: 36rpx;
        color: #666;
        margin-right: 20rpx;
        width: 40rpx;
        text-align: center;
      }

      input {
        flex: 1;
        height: 100%;
        font-size: 32rpx;
        color: #333;
      }

      .toggle-btn {
        font-size: 28rpx;
        color: #07c160;
        padding-left: 20rpx;
      }
    }
  }

  .error-message {
    font-size: 26rpx;
    color: #ff4d4f;
    padding: 10rpx 30rpx;
    min-height: 36rpx;
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #07c160;
    color: #fff;
    font-size: 34rpx;
    border-radius: 45rpx;
    margin: 40rpx 0;
    box-shadow: 0 5rpx 15rpx rgba(7, 193, 96, 0.3);

    &:disabled {
      background-color: #a5e8c5;
      box-shadow: none;
    }
  }

  .other-login {
    display: flex;
    align-items: center;
    margin: 60rpx 0 40rpx;

    .line {
      flex: 1;
      height: 1rpx;
      background-color: #eee;
    }

    .text {
      padding: 0 20rpx;
      font-size: 26rpx;
      color: #999;
    }
  }

  .social-login {
    display: flex;
    justify-content: center;

    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180rpx;
      height: 60rpx;
      background-color: #07c160;
      color: #fff;
      font-size: 28rpx;
      border-radius: 30rpx;
    }
  }
}

// 底部样式
.footer {
  padding: 40rpx 0;
  text-align: center;

  .test-account {
    display: inline-flex;
    align-items: center;
    background-color: #fff8e6;
    color: #ff9800;
    font-size: 24rpx;
    padding: 8rpx 20rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;

    .close-btn {
      margin-left: 10rpx;
      font-size: 28rpx;
      font-weight: bold;
    }
  }

  .copyright {
    font-size: 22rpx;
    color: #999;
  }
}

// 适配深色模式
@media (prefers-color-scheme: dark) {
  .login-page {
    background-color: #1a1a1a;
  }

  .login-header {
    .title {
      color: #fff;
    }
    .subtitle {
      color: #ccc;
    }
  }

  .input-wrapper {
    background-color: #333;

    input {
      color: #fff;
    }
  }

  .copyright {
    color: #666;
  }
}
</style>
    