<template>
    <Panel :title="title">
        <template v-slot:input-field>
            <div class="mt-2 w-10/12">
                <div class="flex items-center justify-between">
                    <span class="w-5/12 text-md sm:text-lg md:w-4/12 lg:w-2/12">Category Name</span>
                    <input placeholder="Category" class="w-7/12 md:w-8/12 lg:w-9/12 input-form" type="text" v-model="category.name">
                </div>
                <br>
                <div class="menu-container">
                    <span class="menu-name sm:text-xl text-center">Menu</span>
                    <span class="menu-price sm:text-xl text-center">Price</span>
                </div>
                <Menu @menuId="removeMenu" v-for="menu in category.menuList" :key="menu.id" :menu="menu" />
                <div class="border-2 rounded p-2 text-center cursor-pointer hover:bg-gray-100" @click="doAdd()">
                    <span>
                        <i class="fas fa-plus text-4xl" />
                    </span>
                </div>
            </div>
            <button class="form-submit-button" @click="doSubmit()">{{ title }}</button>
        </template>
    </Panel>
</template>

<script>
import Panel from '@/components/Panel.vue'
import Menu from '@/components/Menu.vue'

import { mapGetters, mapActions } from 'vuex'

import RestaurantService from '@/services/RestaurantService'

import CommonUtils from '@/utils/CommonUtils'

export default {
    components: {
        Panel,
        Menu
    },
    created() {
        if (this.$route.params.name) {
            this.category = this.getCategory(this.$route.params.name)
            this.title = "Edit"
        } else {
            this.title = "New"
        }
    },
    data() {
        return {
            title: null,
            button: null,
            category: {
                id: CommonUtils.makeId(8),
                name: "",
                menuList: [{id: CommonUtils.makeId(8), name: "", price: ""}]
            }
        }
    },
    methods: {
        ...mapActions(['setLoading', 'setMsg']),
        doAdd() {
            this.category.menuList.push({id: CommonUtils.makeId(8), name: "", price: ""})
        },
        removeMenu(id) {
            for( var i = 0; i < this.category.menuList.length; i++){ 
                if ( this.category.menuList[i].id === id) { 
                    this.category.menuList.splice(i, 1)
                }
            }
        },
        async doSubmit() {
            this.setLoading(true)
            
            try {
                let resp
                
                if (this.title === "Edit") {
                    resp = await RestaurantService.updateMenu(this.restaurant.id, this.category)
                    this.setMsg("Saved")

                    //TODO SUCCESS BACK TO PROFILE
                } else {
                    resp = await RestaurantService.insertMenu(this.restaurant.id, this.category)
                    this.setMsg("Saved")

                    //TODO SUCCESS BACK TO PROFILE
                }
                
                
            } catch (err) {
                this.setMsg(err.response.data.message)
            }

            this.setLoading(false)
        }
    },
    computed: {
        ...mapGetters(['getCategory', 'restaurant'])
    }
}
</script>