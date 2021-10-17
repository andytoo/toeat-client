import Api from '@/services/Api'
import store from '@/store/index'

export default {
    getOrders() {
        return Api().get(`/api/order/all/${store.state.user.restaurantId}`)
    },
    getRestaurant() {
        return Api().get(`/api/restaurant/${store.state.user.restaurantId}`)
    },
    updateRest(restaurant) {
        return Api().post('/api/restaurant/update', restaurant)
    },
    insertMenu(restaurantId, menu) {
        return Api().post(`/api/restaurant/insertMenu/${restaurantId}`, menu)
    },
    updateMenu(restaurantId, menu) {
        return Api().post(`/api/restaurant/updateMenu/${restaurantId}`, menu)
    },
    getImage(restaurantId) {
        return Api().get(`/api/restaurant/image64/${restaurantId}`)
    },
    uploadImage(restaurantId, formData) {
        return Api().post(`/api/restaurant/upload/${restaurantId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}