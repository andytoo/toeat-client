import api from '@/services/Api'
import store from '@/store/index'

export default {
    getOrders() {
        return api.get(`/api/order/all/${store.state.user.restaurantId}`)
    },
    updateOrderStatus(order) {
        return api.post(`/api/order/update`, order)
    }
}