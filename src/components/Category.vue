<template>
    <router-link :to="{ name: 'Edit', params: { name: category.name }}">
        <h3 class="text-2xl">{{ category.name }}</h3>
    </router-link>
</template>

<script>
export default {
    props: { category: Object }
}
</script>