<template>
  <view class="life-container">
    <!-- 头部组件 -->
    <LifeHeader 
      :activeTab="activeTab" 
      @switchTab="switchTab" 
      @showPublishDialog="showPublishDialog"
    />
    
    <!-- 内容区域（根据标签切换） -->
    <view class="content-section">
      <PublicPosts 
        v-if="activeTab === 'public'" 
        :posts="publicPosts" 
        @toggleLike="toggleLike"
        @showComments="showComments"
        @sharePost="sharePost"
      />
      
      <PrivateDiaries 
        v-else-if="activeTab === 'private'" 
        :diaries="privateDiaries" 
        @showDiaryDialog="showDiaryDialog"
        :getMoodEmoji="getMoodEmoji"
      />
      
      <TodaySchedule 
        v-else-if="activeTab === 'schedule'" 
        :scheduleList="todaySchedule" 
        @toggleSchedule="toggleSchedule"
        @showScheduleDialog="showScheduleDialog"
      />
    </view>
    
    <!-- 弹窗组件 -->
    <PublishModal 
      v-if="showPublish" 
      :newPost="newPost" 
      @hidePublishDialog="hidePublishDialog"
      @publishPost="publishPost"
    />
    
    <DiaryModal 
      v-if="showDiary" 
      :newDiary="newDiary" 
      :moodOptions="moodOptions"
      @hideDiaryDialog="hideDiaryDialog"
      @saveDiary="saveDiary"
    />
    
    <ScheduleModal 
      v-if="showSchedule" 
      :newSchedule="newSchedule" 
      @hideScheduleDialog="hideScheduleDialog"
      @saveSchedule="saveSchedule"
    />
  </view>
</template>

<script setup>
import { ref, reactive ,onMounted} from 'vue'
import LifeHeader from './components/LifeHeader.vue'
import PublicPosts from './components/PublicPosts.vue'
import PrivateDiaries from './components/PrivateDiaries.vue'
import TodaySchedule from './components/TodaySchedule.vue'
import PublishModal from './components/PublishModal.vue'
import DiaryModal from './components/DiaryModal.vue'
import ScheduleModal from './components/ScheduleModal.vue'
import request from '@/utils/request'

// 状态管理
const activeTab = ref('public')
const showPublish = ref(false)
const showDiary = ref(false)
const showSchedule = ref(false)
const loading  = ref(false)
// 数据存储
const publicPosts = ref([])

const privateDiaries = ref([
  // {
  //   id: '1',
  //   date: '2024-01-15',
  //   title: '美好的一天',
  //   content: '今天心情特别好，完成了很多事情。和朋友聊天很开心，感觉生活充满了希望。',
  //   mood: 'happy',
  //   tags: ['朋友', '开心', '充实']
  // },
  // {
  //   id: '2',
  //   date: '2024-01-14',
  //   title: '平静的思考',
  //   content: '今天工作比较忙，但晚上有时间静下来思考一些事情。生活需要平衡。',
  //   mood: 'neutral',
  //   tags: ['工作', '平衡', '思考']
  // }
])

const todaySchedule = ref([
  // { id: '1', time: '09:00', title: '晨间瑜伽', completed: true },
  // { id: '2', time: '10:30', title: '团队会议', completed: true },
  // { id: '3', time: '14:00', title: '和朋友喝咖啡', completed: false },
  // { id: '4', time: '19:00', title: '阅读时间', completed: false }
])

// 表单数据
const newPost = reactive({ content: '', isPublic: true })
const newDiary = reactive({ title: '', content: '', mood: 'happy', tags: '' })
const newSchedule = reactive({ time: '', title: '' })
const moodOptions = [
  { value: 'happy', emoji: '😊' ,emojiIcon:'icon-a-smile'},
  { value: 'love', emoji: '❤️',emojiIcon: 'icon-a-smile'},
  { value: 'angry', emoji: '😐' ,emojiIcon:'icon-a-angry'},
  { value: 'sad', emoji: '😢' ,emojiIcon:'icon-a-cry'}
]

// 方法
const switchTab = (tab) => {
	activeTab.value = tab
	switch (tab){
		case 'public':
		getPublicPosts(1)
			break;
		case 'private':
		getPrivateDiaries(1)
			break;
		case 'schedule':
		  getTodaySchedules(1)
		  	break;
		default:
			break;
	}
}

// 弹窗控制
const showPublishDialog = () => showPublish.value = true
const hidePublishDialog = () => { showPublish.value = false; newPost.content = '' }
const showDiaryDialog = () => showDiary.value = true
const hideDiaryDialog = () => { showDiary.value = false; Object.assign(newDiary, { title: '', content: '', mood: 'happy', tags: '' }) }
const showScheduleDialog = () => showSchedule.value = true
const hideScheduleDialog = () => { showSchedule.value = false; Object.assign(newSchedule, { time: '', title: '' }) }
// 初始化时获取第一页数据
onMounted(() => {
  getPublicPosts(1) // 加载第一页getPrivateDiaries(1)
})
//获取生活动态列表
const total = ref(0)
const getPublicPosts = async(currentPage) => {
  try {
	const params = {
		page:currentPage,
		size:10
	}
  	const res = await request.get('/api/v1/life/posts', {params:params})
	
	if(res.code===200){
	  publicPosts.value  = res.data.posts // 更新帖子列表
	  total.value = res.data.total // 更新总条数
		
	}else{
		uni.showToast({
			title:'获取数据失败'
		})
	}
  } catch (error) {
  	uni.showToast({ title: '网络错误', icon: 'none' })
  }
}
// 数据操作
const publishPost = async() => {
  if (!newPost.content.trim()) return wx.showToast({ title: '请输入内容', icon: 'none' })
  const params = {
    id: Date.now().toString(),
    author: '我',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    content: newPost.content,
    timestamp: '刚刚',
    likes: 0,
    comments: 0,
    isLiked: false
  }
  const res = await request.post('/api/v1/life/posts', params)
  hidePublishDialog()
  wx.showToast({ title: '发布成功', icon: 'success' })
  //刷新发布列表数据
  getPublicPosts()
}
const getPrivateDiaries  = async(currentPage) => {
  try {
	const params = {
		page:currentPage,
		size:10
	}
  	const res = await request.get('/api/v1/life/diaries', {params:params})
	
	if(res.code===200){
	  privateDiaries.value  = res.data.diaries // 更新帖子列表
	}else{
		uni.showToast({
			title:'获取数据失败'
		})
	}
  } catch (error) {
  	uni.showToast({ title: '网络错误', icon: 'none' })
  }
}
const saveDiary = async() => {
  if (!newDiary.title.trim() || !newDiary.content.trim()) return wx.showToast({ title: '请填写标题和内容', icon: 'none' })
  const params = {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    ...newDiary,
    tags: newDiary.tags//newDiary.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  // const params =  
  // {
  //   id: '2',
  //   date: '2024-01-14',
  //   title: '平静的思考',
  //   content: '今天工作比较忙，但晚上有时间静下来思考一些事情。生活需要平衡。',
  //   mood: 'neutral',
  //   tags: "工作, 平衡, 思考"
  // }
  const res = await request.post('/api/v1/life/diaries',params)
  hideDiaryDialog()
  wx.showToast({ title: '保存成功', icon: 'success' })
  getPrivateDiaries()
}
//获取今日行程列表
const getTodaySchedules  = async(currentPage) => {
  try {
	const params = {
		page:currentPage,
		size:10
	}
  	const res = await request.get('/api/v1/life/schedules', {params:params})
	
	if(res.code===200){
	  todaySchedule.value  = res.data.schedules // 更新帖子列表
	}else{
		uni.showToast({
			title:'获取数据失败'
		})
	}
  } catch (error) {
  	uni.showToast({ title: '网络错误', icon: 'none' })
  }
}
const saveSchedule = async() => {
  if (!newSchedule.time.trim() || !newSchedule.title.trim()) return wx.showToast({ title: '请填写时间和事项', icon: 'none' })
  const params = { ...newSchedule, id: Date.now().toString(), completed: false }
  const res = await request.post('/api/v1/life/schedules',params)
  // todaySchedule.value.push({ ...newSchedule, id: Date.now().toString(), completed: false })
  // todaySchedule.value.sort((a, b) => a.time.localeCompare(b.time)) //排序
  hideScheduleDialog()
  wx.showToast({ title: '添加成功', icon: 'success' })
  getTodaySchedules()
}

// 交互操作
const toggleLike = (postId) => {
  const post = publicPosts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}

const toggleSchedule = async(scheduleId) => {
  try {
    // 查找对应的行程项
    const item = todaySchedule.value.find(s => s.id === scheduleId);
    if (!item) {
      console.error('未找到对应的行程项');
      uni.showToast({ title: '数据异常', icon: 'none' });
      return;
    }

    // 保存原始状态用于错误回滚
    const originalCompleted = item.completed;
    // 显示加载状态
    item.loading = true;

    // 关键修改：后端接口路径包含/complete后缀
    const res = await request.put(`/api/v1/life/schedules/${scheduleId}/complete`);

    // 处理响应
    if (res && res.code === 200) {
      // 使用后端返回的状态更新本地
      item.completed = res.data.completed;
      uni.showToast({ title: '更新成功', icon: 'success' });
    } else {
      // 响应异常时回滚状态
      item.completed = originalCompleted;
      uni.showToast({ 
        title: res?.message || '更新失败', 
        icon: 'none' 
      });
    }
  } catch (error) {
    // 网络错误处理
    const item = todaySchedule.value.find(s => s.id === scheduleId);
    if (item) {
      // 回滚状态
      item.completed = !item.completed;
      item.loading = false;
    }
    
    // 错误提示细化
    let errorMsg = '网络异常，请稍后重试';
    if (error.message.includes('404')) {
      errorMsg = '接口不存在';
    } else if (error.message.includes('401')) {
      errorMsg = '请先登录';
    } else if (error.message.includes('500')) {
      errorMsg = '服务器错误';
    }
    
    uni.showToast({ title: errorMsg, icon: 'none' });
    console.error('切换行程状态失败:', error);
  } finally {
    // 确保加载状态关闭
    const item = todaySchedule.value.find(s => s.id === scheduleId);
    if (item) {
      item.loading = false;
    }
  }
};
    
const getMoodEmoji = (mood) => {
  const option = moodOptions.find(o => o.value === mood)
  return option ? option.emojiIcon : 'icon-a-smile'
}

// 预留方法
const showComments = (postId) => console.log('查看评论:', postId)
const sharePost = (postId) => console.log('分享动态:', postId)
</script>

<style lang="scss" scoped>
.life-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f3e5f5 100%);
}
.content-section {
  padding: 32rpx 48rpx 160rpx;
  // margin-top: -32rpx;
}
</style>