<template>
  <div class="grid-layout"> 
    <Order v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import Order from '@/components/Order.vue'

import { mapActions, mapGetters } from 'vuex'

import RestaurantService from '@/services/RestaurantService'

export default {
  components: { Order },
  async created() {
    this.setLoading(true)

    try {
      const resp = await RestaurantService.getOrders()
      this.saveToOrders(resp.data)
    } catch (err) {
      this.setMsg(err.response.data.message)
      setTimeout(() => { this.setMsg(null) }, 1500)
    }

    this.setLoading(false)
  },
  methods: {
    ...mapActions(['setLoading', 'setMsg', 'saveToOrders'])
  },
  computed: {
    ...mapGetters(['orders', 'isLoading'])
  }
}
</script>