<template>
    <div :class="{ 'bg-green-300' : order.status == '10'  }" class="grid-container">
        <div class="my-3 mx-2 pb-2 border-b-2 flex justify-between">
            <span class="font-bold">{{ order.id }}</span>
            <span class="font-light">{{ order.phone }}</span>
        </div>
        <div class="my-3 mx-2">
            <div class="m-2 flex justify-between items-center text-xl" v-for="item in order.itemList" :key="item.name">
                <span class="font-light">{{ item.name }}</span>
                <span class="font-light">{{ item.price }} x{{ item.quantity }}</span>
            </div>
            <div class="px-2 flex justify-between items-center text-2xl mt-3 border-t-2">
                <span>Total</span>
                <span>$ {{ order.total }}</span>
            </div>
        </div>
        <div v-if="order.status == '00'" class="text-center my-2">
            <button @click="accept()" class="mx-2 px-3 py-2 bg-green-300 border-1 rounded">Accept</button>
            <button class="mx-2 px-3 py-2 bg-red-300 border-1 rounded">Decline</button>
        </div>
    </div>
</template>

<script>
import OrderService from '@/services/OrderService'

export default {
    props: { order: Object },
    methods: {
        async accept() {
            this.order.status = '10'
            try {
                const resp = OrderService.updateOrderStatus(this.order)
            } catch (err) {
                this.setMsg(err.response.data.message)
            }
        },
        async decline() {
            this.order.status = '-1'
            try {
                const resp = OrderService.updateOrderStatus(this.order)
            } catch (err) {
                this.setMsg(err.response.data.message)
            }
        }
    }
}
</script>