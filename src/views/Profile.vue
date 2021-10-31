<template>
    <Panel :title="title">
        <template v-slot:input-field>

            <div class="mb-2 relative w-11/12 sm:w-9/12 h-full flex justify-center cursor-pointer">
                <img @click="chooseFile" class="border w-full max-h-60 sm:max-h-96 bg-center bg-cover rounded-md" :src="'data:image/jpeg;base64,' + image" alt="Image not found">
                <!-- <div class="absolute w-full h-full text-white flex justify-center items-center text-6xl hover:bg-white hover:bg-opacity-30 z-40"></div> <i class="fas fa-camera"></i> -->

                <div class="absolute bottom-0 text-center w-full bg-white bg-opacity-60">
                    <input class="hidden" type="file" id="file" @change="uploadImage">
                    <span class="block py-2 w-full">Choose Image</span>
                </div>
                <label class="hidden" ref="uploadImg" for="file"></label>
            </div>


            <input class="input-form" placeholder="Id" type="text" name="id" v-model="restaurant.id" disabled>
            <input class="input-form" placeholder="Restaurant Name" type="text" name="name" v-model="restaurant.name">
            <input class="input-form" placeholder="City" type="text" name="city" v-model="restaurant.city">
            <textarea class="input-form" placeholder="Info" rows="5" type="text" name="info" v-model="restaurant.info"></textarea>

            <h2 class="mt-2 text-3xl border-b-2 w-10/12">Menu</h2>
            <div class="grid-layout w-10/12">
                <Category class="grid-container grid-height container" v-for="category in restaurant.categoryList" :key="category.name" :category="category" />
                <router-link :to="{ name: 'New' }">
                    <div class="grid-container grid-height container"><i class="fas fa-plus text-5xl" /></div>
                </router-link>
            </div>
            <button class="form-submit-button" @click="doSave()">Save</button>
        </template>
    </Panel>
</template>

<script>
import Panel from '@/components/Panel.vue'
import Category from '@/components/Category.vue'

import { mapActions, mapGetters } from 'vuex'

import RestaurantService from '@/services/RestaurantService'

export default {
    components: {
        Panel,
        Category
    },
    data() {
        return {
            imageFile: null,
            image: null,
            title: "Restaurant Info"
        }
    },
    async created() {
        this.setLoading(true)
        
        try {
            const resp = await RestaurantService.getRestaurant()
            this.saveToRestaurant(resp.data)

            const imageResp = await RestaurantService.getImage(this.restaurant.id)
            this.image = imageResp.data
        } catch (err) {
            this.setMsg(err.response.data.message)
        }

        this.setLoading(false)
    },
    methods: {
        ...mapActions(['setLoading', 'setMsg', 'saveToRestaurant']),
        async doSave() {
            this.setLoading(true)
            try {
                const resp = await RestaurantService.updateRest(this.restaurant)
                
                this.setMsg("Saved")
            } catch (err) {
                this.setMsg(err.response.data.message)
            }
            this.setLoading(false)
        },
        chooseFile(e) {
            this.$refs['uploadImg'].click()
        },
        async uploadImage(e) {
            this.imageFile = e.target.files[0]
            let formData = new FormData()
            formData.append('file', this.imageFile)
            this.setLoading(true)
            try {
                const resp = await RestaurantService.uploadImage(this.restaurant.id, formData)
                const imageResp = await RestaurantService.getImage(this.restaurant.id)
                this.image = imageResp.data

                this.setMsg("Image Uploaded")
            } catch (err) {
                this.setMsg(err.response.data.message)
            }
            this.setLoading(false)


        }
    },
    computed: {
        ...mapGetters(['restaurant'])
    }
}
</script>

<style lang="postcss" scoped>
    .container {
        @apply flex justify-center items-center cursor-pointer shadow-pop
    }
    .shadow-pop:hover {
        box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.3);
    }
    .grid-height {
        @apply h-40
    }
</style>