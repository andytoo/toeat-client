<template>
    <div class="grid-container">
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
    </div>
</template>

<script>
export default {
    props: { order: Object },
}
</script>