<template>
  <div class="grid-layout"> 
    <Order v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import Order from '@/components/Order.vue'

import { mapActions, mapGetters } from 'vuex'

import OrderService from '@/services/OrderService'
import TokenService from '@/services/TokenService'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let socket = null

export default {
  components: { Order },
  async created() {
    socket = new SockJS(`${process.env.VUE_APP_API_URL}/ws`)
    const client = Stomp.over(socket)
    client.connect({}, frame => {
      client.subscribe(`/topic/order/${TokenService.getRestaurantId()}`, payload => {
        const data = JSON.parse(payload.body)
        this.addOrders(data)
      })
    })

    this.setLoading(true)
    try {
      const resp = await OrderService.getOrders()
      this.setOrders(resp.data)
    } catch (err) {
      this.setMsg(err.response.data.message)
    }
    this.setLoading(false)
  },
  unmounted(){
    if (socket != null) {
      socket.close();
    }
  },
  methods: {
    ...mapActions(['setLoading', 'setMsg', 'setOrders', 'addOrders'])
  },
  computed: {
    ...mapGetters(['orders'])
  }
}
</script>