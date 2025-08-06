import { createStore } from 'vuex'
import user from './modules/user'
import life from './modules/life'
import food from './modules/food'

const store = createStore({
  modules: {
    user,
    life,
    food
  }
})

export default store