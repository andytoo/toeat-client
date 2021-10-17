<template>
    <div class="menu-container">
        <div class="menu-name">
            <input class="menu-form w-full" placeholder="Menu Name" type="text" v-model="menu.name">
        </div>
        <div class="menu-price relative">
            <input class="menu-form w-full" placeholder="Price" type="number" v-model="menu.price">
            <span class="absolute text-xl -right-2 -top-1 cursor-pointer text-red-500 hover:text-red-600" @click="removeMenu(menu)"><i class="fas fa-minus-circle" /></span>
        </div>
    </div>
</template>

<script>
export default {
    props: { menu: Object },
    methods: {
        removeMenu({id}) {
            this.$emit('menuId', id);
        }
    }
}
</script>

<style lang="postcss">
    .menu-container {
        @apply flex justify-between
    }
    .menu-name {
        @apply w-8/12 md:w-9/12
    }
    .menu-price {
        @apply w-3/12 md:w-2/12
    }
    .menu-form {
        @apply border rounded my-2 py-2 pl-3
    }
</style>