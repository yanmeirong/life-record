import request from '@/utils/request'

/**
 * 获取食谱列表
 */
export const getRecipes = () => {
  return request({
    url: '/recipes',
    method: 'GET'
  })
}

/**
 * 获取单个食谱详情
 * @param {number} id - 食谱ID
 */
export const getRecipeDetail = (id) => {
  return request({
    url: `/recipes/${id}`,
    method: 'GET'
  })
}

/**
 * AI生成食谱
 * @param {Object} data - 生成参数
 * @param {string[]} data.ingredients - 食材列表
 * @param {string} [data.dietary_restrictions] - 饮食限制
 */
export const generateAIRecipe = (data) => {
  return request({
    url: '/recipes/ai-generated',
    method: 'POST',
    data
  })
}

/**
 * 收藏食谱
 * @param {number} recipeId - 食谱ID
 */
export const collectRecipe = (recipeId) => {
  return request({
    url: `/recipes/${recipeId}/collect`,
    method: 'POST'
  })
}

/**
 * 取消收藏食谱
 * @param {number} recipeId - 食谱ID
 */
export const uncollectRecipe = (recipeId) => {
  return request({
    url: `/recipes/${recipeId}/collect`,
    method: 'DELETE'
  })
}

/**
 * 获取我的收藏食谱
 */
export const getCollectedRecipes = () => {
  return request({
    url: '/recipes/collected',
    method: 'GET'
  })
}

/**
 * 分享食谱
 * @param {number} recipeId - 食谱ID
 */
export const shareRecipe = (recipeId) => {
  return request({
    url: `/recipes/${recipeId}/share`,
    method: 'POST'
  })
}
    