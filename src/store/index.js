import { createStore } from 'vuex'

export default createStore({
  state: {
    msg: null,
    isLoading: false,

    // User
    user: {},
    isUserSignedIn: false,

    // Token
    accessToken: null,
    refreshToken: null,

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
    updateUser: (state, user) => {
      state.user = user
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
      if (state.accessToken) {
        state.isUserSignedIn = true
      } else {
        state.isUserSignedIn = false
      }
    },
    updateRefreshToken: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    saveToOrders: (state, orders) => {
      state.orders = orders
    },
    saveToRestaurant: (state, restaurant) => {
      state.restaurant = restaurant
    }
  },
  actions: {
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
    },
    updateTokenAndUser: ({commit}, { user, accessToken, refreshToken }) => {
      commit('updateUser', user)
      commit('updateAccessToken', accessToken)
      commit('updateRefreshToken', refreshToken)
    },
    closeMsg: ({commit}) => {
      commit('setMsg', { msg: null, isErr: null })
    },
    saveToOrders: ({commit}, orders) => {
      commit('saveToOrders', orders)
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
    getCategory: state => name => state.restaurant.categoryList.find(category => category.name == name)
  }
})
