import { createStore } from 'vuex'
import TokenService from '@/services/TokenService'

export default createStore({
  state: {
    msg: null,
    isLoading: false,

    // User
    user: TokenService.getUser() || {},
    isUserSignedIn: TokenService.isUserSignedIn() || false,

    // Restaurant Data
    orders: [],
    restaurant: {}
  },
  mutations: {
    setMsg: (state, data) => {
      state.msg = data
    },
    setLoading: (state, data) => {
      state.isLoading = data
    },
    setUser: (state, data) => {
      state.user = data
    },
    setIsUserSignedIn: (state, data) => {
      state.isUserSignedIn = data
    },
    setOrders: (state, orders) => {
      state.orders = orders
    },
    addOrders: (state, order) => {
      state.orders.push(order)
    },
    saveToRestaurant: (state, restaurant) => {
      state.restaurant = restaurant
    }
  },
  actions: {
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
      setTimeout(() => { commit('setMsg', null) }, 1500)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
    },
    setUser: ({commit}, data) => {
      commit('setUser', data)
      if (Object.keys(data).length === 0) commit('setIsUserSignedIn', false)
      else commit('setIsUserSignedIn', true)
    },
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
    msg: state => state.msg,
    isLoading: state => state.isLoading,
    user: state => state.user,
    isUserSignedIn: state => state.isUserSignedIn,
    orders: state => state.orders,
    restaurant: state => state.restaurant,
    getCategory: state => name => state.restaurant.categoryList.find(category => category.name == name),
  }
})
