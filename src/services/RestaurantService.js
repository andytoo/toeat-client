import api from '@/services/Api'
import store from '@/store/index'

export default {
    getRestaurant() {
        return api.get(`/api/restaurant/${store.state.user.restaurantId}`)
    },
    updateRest(restaurant) {
        return api.post('/api/restaurant/update', restaurant)
    },
    insertMenu(restaurantId, menu) {
        return api.post(`/api/restaurant/insertMenu/${restaurantId}`, menu)
    },
    updateMenu(restaurantId, menu) {
        return api.post(`/api/restaurant/updateMenu/${restaurantId}`, menu)
    },
    getImage(restaurantId) {
        return api.get(`/api/restaurant/image64/${restaurantId}`)
    },
    uploadImage(restaurantId, formData) {
        return api.post(`/api/restaurant/upload/${restaurantId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}