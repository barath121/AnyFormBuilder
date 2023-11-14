<template>
  <NavBar />
  <div class="h-screen-90 logincard flex flex-col justify-center items-center">
    <h1 class="text-3xl mb-8">Login</h1>
    <div class="w-300">
      <form @submit.prevent="login">
        <div class="flex flex-col">
          <label class="mb-2">Username:</label>
          <input
            class="shadow p-1 inputfield rounded mb-4 inputBorder"
            id="username"
            v-model="username"
          />
        </div>
        <div class="flex flex-col">
          <label class="mb-2">Password:</label>
          <input
            type="password"
            class="shadow p-1 inputfield rounded mb-4 inputBorder"
            id="password"
            v-model="password"
            minlength="8"
            maxlength="24"
          />
        </div>
        <button
            class="w-full mainbutton rounded p-1 mb-4"
            id="loginbtn"
            type="submit"
          >
            Login
          </button>
        <div class="text-right mb-4">
          <router-link to="/forgotpassword" class="text-slate-600 p-1"
            >Forgot Password?</router-link
          >
        </div>
      </form>
    </div>
    <p class="text-sm">
      Need a account?<router-link to="/register" class="text-green-500"
        > Create One!</router-link
      >
    </p>
  </div>
</template>
<script>
import ToastMixin from './../mixins/toast.js'
import CheckAuthMixin from './../mixins/checkAuthorized.js'
import NavBar from './MainComponents/NavBar.vue'
export default {
	name: 'Login',
	components: {
		NavBar,
	},
	data() {
		return {
			username: '',
			password: '',
		}
	},
	methods: {
		login() {
			if (this.username.length < 1 || this.password.length < 1) {
				this.displayToast(
					'error',
					'Enter Username and Password before logging in'
				)
				return
			}
			let body = {
				username: this.username,
				password: this.password,
			}
			fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
				.then(async (result) => {
					let user = await result.json()
					if (user.message == 'Signin Sucessful') {
						this.displayToast('success', 'Login Sucessful')
						localStorage.setItem('userToken', user.token)
						this.$router.push('/home')
					} else {
						this.displayToast('error', user.message)
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
	},
	mounted() {
		this.routerUserToHome()
	},
	mixins: [ToastMixin, CheckAuthMixin],
}
</script>
