<template>
  <view class="container">
    <!-- 头部区域 -->
    <view class="header">
      <view class="header-content">
        <text class="title">食谱大全</text>
        <text class="subtitle">发现美味，学会烹饪</text>
        
        <!-- 搜索框 -->
        <view class="search-box">
          <text class="search-icon">🔍</text>
          <input 
            type="text" 
            class="search-input" 
            placeholder="搜索食谱或标签..." 
            v-model="searchTerm"
          />
        </view>
      </view>
    </view>
    
    <!-- 食谱列表 -->
    <view class="recipes-container">
      <view class="recipe-grid">
        <view class="recipe-card" v-for="(recipe, index) in filteredRecipes" :key="index" @click="openRecipeDetail(recipe)">
          <view class="recipe-image">
            <image :src="recipe.image" mode="aspectFill"></image>
            <view class="difficulty-badge" :class="getDifficultyClass(recipe.difficulty)">
              {{ recipe.difficulty }}
            </view>
            <view class="recipe-name-overlay">
              <text class="recipe-name">{{ recipe.name }}</text>
            </view>
          </view>
          
          <view class="recipe-info">
            <view class="recipe-meta">
              <view class="meta-item">
                <text class="meta-icon">⏱️</text>
                <text class="meta-text">{{ recipe.cookTime }}分钟</text>
              </view>
              <view class="meta-item">
                <text class="meta-icon">👥</text>
                <text class="meta-text">{{ recipe.servings }}人份</text>
              </view>
            </view>
            
            <view class="recipe-tags">
              <view class="tag" v-for="(tag, tagIndex) in recipe.tags.slice(0, 2)" :key="tagIndex">
                {{ tag }}
              </view>
            </view>
            
            <button class="cook-btn">
              <text class="cook-icon">▶️</text>
              <text class="cook-text">开始制作</text>
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 食谱详情弹窗 -->
    <view class="detail-mask" v-if="selectedRecipe" @click="closeRecipeDetail"></view>
    <view class="detail-dialog" v-if="selectedRecipe">
      <view class="detail-content">
        <scroll-view scroll-y="true" class="detail-scroll">
          <text class="detail-title">{{ selectedRecipe.name }}</text>
          
          <image :src="selectedRecipe.image" mode="widthFix" class="detail-image"></image>
          
          <view class="detail-meta">
            <view class="detail-meta-item">
              <text class="meta-icon">⏱️</text>
              <text class="meta-text">{{ selectedRecipe.cookTime }}分钟</text>
            </view>
            <view class="detail-meta-item">
              <text class="meta-icon">👥</text>
              <text class="meta-text">{{ selectedRecipe.servings }}人份</text>
            </view>
            <view class="detail-meta-item">
              <text class="meta-icon">👨‍🍳</text>
              <text class="meta-text" :class="getDifficultyClass(selectedRecipe.difficulty)">{{ selectedRecipe.difficulty }}</text>
            </view>
          </view>
          
          <view class="section">
            <text class="section-title">食材</text>
            <view class="ingredients">
              <view class="ingredient-item" v-for="(ingredient, i) in selectedRecipe.ingredients" :key="i">
                <text class="ingredient-name">{{ ingredient.name }}</text>
                <text class="ingredient-amount">{{ ingredient.amount }}</text>
              </view>
            </view>
          </view>
          
          <view class="section">
            <text class="section-title">步骤</text>
            <view class="steps">
              <view class="step-item" v-for="(step, i) in selectedRecipe.steps" :key="i">
                <view class="step-number">{{ i + 1 }}</view>
                <text class="step-text">{{ step }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
        
        <button class="close-btn" @click="closeRecipeDetail">关闭</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索关键词
const searchTerm = ref('')

// 食谱数据
const recipes = ref([
  {
    id: '1',
    name: '红烧肉',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    cookTime: 90,
    servings: 4,
    difficulty: '中等',
    ingredients: [
      { name: '五花肉', amount: '500g' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '冰糖', amount: '30g' },
      { name: '料酒', amount: '2勺' },
      { name: '姜片', amount: '3片' },
      { name: '八角', amount: '2个' }
    ],
    steps: [
      '五花肉洗净切成3cm见方的块，冷水下锅焯水去血沫。',
      '热锅下油，放入冰糖小火炒至焦糖色。',
      '下入五花肉翻炒上色，加入姜片、八角炒香。',
      '倒入生抽、老抽、料酒翻炒均匀。',
      '加入热水没过肉块，大火烧开转小火炖1小时。',
      '最后大火收汁至浓稠即可出锅。'
    ],
    tags: ['家常菜', '下饭', '红烧']
  },
  {
    id: '2',
    name: '西红柿鸡蛋',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    cookTime: 15,
    servings: 2,
    difficulty: '简单',
    ingredients: [
      { name: '鸡蛋', amount: '3个' },
      { name: '西红柿', amount: '2个' },
      { name: '葱花', amount: '适量' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '1小勺' },
      { name: '生抽', amount: '1勺' }
    ],
    steps: [
      '鸡蛋打散加少许盐，热油炒熟盛起。',
      '西红柿切块，热锅下油爆炒出汁。',
      '加入炒好的鸡蛋，调味炒匀。',
      '撒上葱花即可出锅。'
    ],
    tags: ['家常菜', '简单', '快手']
  },
  {
    id: '3',
    name: '麻婆豆腐',
    image: 'https://images.unsplash.com/photo-1582870088084-4b2a32a9b0ba?w=400&h=300&fit=crop',
    cookTime: 20,
    servings: 3,
    difficulty: '中等',
    ingredients: [
      { name: '嫩豆腐', amount: '400g' },
      { name: '肉末', amount: '100g' },
      { name: '豆瓣酱', amount: '2勺' },
      { name: '花椒粉', amount: '适量' },
      { name: '葱花', amount: '适量' },
      { name: '蒜末', amount: '适量' },
      { name: '生抽', amount: '1勺' }
    ],
    steps: [
      '豆腐切块，开水焯烫去豆腥味。',
      '热锅下油，爆炒肉末至变色。',
      '加入豆瓣酱、蒜末炒出红油。',
      '倒入豆腐块，加水煮3分钟。',
      '调味勾芡，撒花椒粉和葱花即可。'
    ],
    tags: ['川菜', '麻辣', '豆腐']
  },
  {
    id: '4',
    name: '糖醋排骨',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    cookTime: 45,
    servings: 3,
    difficulty: '中等',
    ingredients: [
      { name: '排骨', amount: '500g' },
      { name: '白糖', amount: '3勺' },
      { name: '醋', amount: '2勺' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' }
    ],
    steps: [
      '排骨洗净切段，焯水去血沫。',
      '热锅放糖炒糖色，下排骨炒匀。',
      '加调料和水，大火烧开转小火炖30分钟。',
      '大火收汁即可。'
    ],
    tags: ['家常菜', '甜酸']
  }
])

// 筛选食谱
const filteredRecipes = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return recipes.value.filter(recipe => 
    recipe.name.toLowerCase().includes(term) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(term))
  )
})

// 食谱详情
const selectedRecipe = ref(null)

const openRecipeDetail = (recipe) => {
  selectedRecipe.value = recipe
}

const closeRecipeDetail = () => {
  selectedRecipe.value = null
}

// 获取难度对应的样式
const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case '简单': return 'easy'
    case '中等': return 'medium'
    case '困难': return 'hard'
    default: return ''
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #fff8f0;
}

/* 头部样式 */
.header {
  background: linear-gradient(90deg, #facc15, #f97316, #ef4444);
  padding: 40rpx 30rpx 60rpx;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
}

.title {
  font-size: 36rpx;
  color: white;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: 30rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30rpx;
  padding: 0 20rpx;
  height: 70rpx;
}

.search-icon {
  font-size: 28rpx;
  color: #9ca3af;
  margin-right: 10rpx;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 26rpx;
  color: #374151;
}

/* 食谱列表样式 */
.recipes-container {
  padding: 20rpx 30rpx;
  margin-top: -30rpx;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.recipe-card {
  background-color: white;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.recipe-image {
  position: relative;
  width: 100%;
  height: 180rpx;
}

.recipe-image image {
  width: 100%;
  height: 100%;
}

.difficulty-badge {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  color: white;
  font-weight: bold;
}

.difficulty-badge.easy {
  background-color: #22c55e;
}

.difficulty-badge.medium {
  background-color: #f59e0b;
}

.difficulty-badge.hard {
  background-color: #ef4444;
}

.recipe-name-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20rpx 15rpx 10rpx;
}

.recipe-name {
  color: white;
  font-size: 26rpx;
  font-weight: bold;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
}

.recipe-info {
  padding: 15rpx;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #6b7280;
}

.meta-icon {
  font-size: 22rpx;
  margin-right: 5rpx;
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 15rpx;
}

.tag {
  background-color: #ffedd5;
  color: #c2410c;
  font-size: 20rpx;
  padding: 3rpx 10rpx;
  border-radius: 10rpx;
}

.cook-btn {
  width: 100%;
  height: 60rpx;
  background-color: #f97316;
  color: white;
  border-radius: 15rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cook-icon {
  margin-right: 8rpx;
  font-size: 22rpx;
}

/* 食谱详情弹窗样式 */
.detail-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.detail-dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  z-index: 1000;
  height: 85vh;
}

.detail-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.detail-scroll {
  flex: 1;
  padding: 30rpx;
  box-sizing: border-box;
}

.detail-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  text-align: center;
  margin-bottom: 20rpx;
}

.detail-image {
  width: 100%;
  height: 250rpx;
  border-radius: 20rpx;
  margin-bottom: 25rpx;
  object-fit: cover;
}

.detail-meta {
  display: flex;
  justify-content: space-around;
  background-color: #fef3c7;
  padding: 15rpx 0;
  border-radius: 15rpx;
  margin-bottom: 30rpx;
}

.detail-meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-meta-item .meta-text {
  font-size: 24rpx;
  color: #92400e;
  margin-top: 5rpx;
}

.detail-meta-item .meta-text.easy {
  color: #166534;
}

.detail-meta-item .meta-text.medium {
  color: #92400e;
}

.detail-meta-item .meta-text.hard {
  color: #b91c1c;
}

.section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 15rpx;
  padding-left: 10rpx;
  border-left: 5rpx solid #f97316;
}

.ingredients {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15rpx;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  background-color: #f9fafb;
  padding: 15rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.ingredient-name {
  color: #374151;
}

.ingredient-amount {
  color: #6b7280;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.step-item {
  display: flex;
  gap: 15rpx;
}

.step-number {
  width: 40rpx;
  height: 40rpx;
  background-color: #f97316;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  font-size: 24rpx;
  color: #374151;
  line-height: 1.6;
}

.close-btn {
  width: 90%;
  height: 80rpx;
  background-color: #f97316;
  color: white;
  border-radius: 15rpx;
  font-size: 28rpx;
  margin: 0 auto 20rpx;
}
</style>