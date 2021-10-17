<template>
    <Panel :title="title">
        <template v-slot:input-field>
            <input @keyup.enter="doSignIn()" class="input-form" placeholder="Phone" maxlength="10" type="text" name="phone" v-model="phone">
            <input @keyup.enter="doSignIn()" class="input-form" placeholder="Password" type="password" name="password" v-model="password">
            <button class="form-submit-button" @click="doSignIn()">{{ title }}</button>
            <div class="mt-3">
                <span>Not a member yet? <span class="text-blue-300" @click="this.$router.push({ name: 'SignUp' })">Sign Up</span></span>
            </div>
        </template>
    </Panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserService from '@/services/UserService'
import Panel from '@/components/Panel.vue'

export default {
    components: { Panel },
    data() {
        return {
            title: "Sign In",
            phone: null,
            password: null
        }
    },
    computed: {
        ...mapGetters(['isUserSignedIn'])
    },
    methods: {
        ...mapActions(['setLoading', 'setMsg', 'updateTokenAndUser']),
        async doSignIn() {
            this.setLoading(true)
            //TODO VALIDATION
            try {
                const resp = await UserService.signIn({ "phone": this.phone, "password": this.password })
                this.updateTokenAndUser({ user: { phone: resp.data.phone, name: resp.data.name, restaurantId: resp.data.restaurantId }, accessToken: resp.data.access_token, refreshToken: resp.data.refresh_token })
            
                this.setMsg("Signed In")
                setTimeout(() => { this.setMsg(null) }, 1500)
            } catch (err) {
                this.setMsg(err.response.data.message)
                setTimeout(() => { this.setMsg(null) }, 1500)

                // if (err.response.status === 401) {
                //     this.signOut()
                //     // location.reload(true)
                // }
            }

            this.setLoading(false)
            if (this.isUserSignedIn) {
                this.$router.push({ name: 'Cart' })
            }
        }
    }
}
</script>