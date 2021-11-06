import { createStore } from 'vuex'
import TokenService from '@/services/TokenService'

export default createStore({
  state: {
    // App
    msg: null,
    isLoading: false,

    // User
    user: TokenService.getUser() || {},
    isUserSignedIn: TokenService.isUserSignedIn() || false,

    // Order & Cart
    orders: [],
    
    // Restaurant
    restaurant: {}
  },
  mutations: {
    // App
    setMsg: (state, data) => {
      state.msg = data
    },
    setLoading: (state, data) => {
      state.isLoading = data
    },

    // User
    setUser: (state, data) => {
      state.user = data
    },
    setIsUserSignedIn: (state, data) => {
      state.isUserSignedIn = data
    },

    // Order & Cart
    setOrders: (state, orders) => {
      state.orders = orders
    },
    addOrders: (state, order) => {
      state.orders.push(order)
    },

    // Restaurant
    saveToRestaurant: (state, restaurant) => {
      state.restaurant = restaurant
    }
  },
  actions: {
    // App
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
      setTimeout(() => { commit('setMsg', null) }, 1500)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
    },

    // User
    setUser: ({commit}, data) => {
      commit('setUser', data)
      if (Object.keys(data).length === 0) commit('setIsUserSignedIn', false)
      else commit('setIsUserSignedIn', true)
    },

    // Restaurant
    setOrders: ({commit}, orders) => {
      commit('setOrders', orders)
    },
    addOrders: ({commit}, order) => {
      commit('addOrders', order)
    },
    saveToRestaurant: ({commit}, restaurant) => {
      commit('saveToRestaurant', restaurant)
    }
  },
  modules: {

  },
  getters: {
    // App
    msg: state => state.msg,
    isLoading: state => state.isLoading,

    // User
    user: state => state.user,
    isUserSignedIn: state => state.isUserSignedIn,

    // Order & Cart
    orders: state => state.orders,

    // Restaurant
    restaurant: state => state.restaurant,
    getCategory: state => name => state.restaurant.categoryList.find(category => category.name == name),
  }
})
