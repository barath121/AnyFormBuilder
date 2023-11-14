<template>
  <NavBar />
  <div class="h-screen-90 logincard flex flex-col justify-center items-center">
    <h1 class="text-3xl mb-8">Register</h1>
    <div class="width-300">
    <form class="max-w-xs" @submit.prevent="register">
      <div class="flex flex-col">
        <label class="mb-2">Username:</label>
        <input class="shadow p-1 rounded mb-4 inputBorder" id="username" v-model="username" />
      </div>
      <div class="flex flex-col">
        <label class="mb-2">Email:</label>
        <input class="shadow p-1 rounded mb-4 inputBorder" 
        id="email" 
        v-model="email" />
      </div>
      <div class="flex flex-col">
        <label class="mb-2">Password:</label>
        <input
          type="password"
          class="shadow p-1 rounded mb-4 inputBorder"
          id="password"
          v-model="password"
          minlength="8"
          maxlength="24"
        />
      </div>
      <div class="flex flex-col">
        <label class="mb-2">Confirm Password:</label>
        <input
          type="password"
          class="shadow p-1 rounded mb-4 inputBorder"
          id="confirmpassword"
          v-model="confirmPassword"
          minlength="8"
          maxlength="24"
        />
      </div>
      <button
        class="w-full mainbutton rounded p-1 mb-4"
        type="submut"
        id="registerbutton"
      >
        Register
      </button>
    </form>
    </div>
    <p class="text-sm">
      Already Have A Account?<router-link to="/login" class="text-green-500"
        > Login!</router-link
      >
    </p>
  </div>
</template>
<script>
import ToastMixin from './../mixins/toast.js'
import NavBar from './MainComponents/NavBar.vue'
export default {
	name: 'Register',
	components: {
		NavBar,
	},
	data() {
		return {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
	},
	methods: {
		register() {
			if (
				this.username.length < 1 ||
        this.password.length < 1 ||
        this.email.length < 1 ||
        this.confirmPassword.length < 1
			) {
				this.displayToast(
					'error',
					'Please enter all fields before registering'
				)
				return
			}
			if (this.password != this.confirmPassword) {
				this.displayToast('error', 'Passwords don\'t match')
				return
			}
			let body = {
				username: this.username,
				password: this.password,
				email: this.email,
			}
			fetch('/api/user/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
				.then(async (result) => {
					let user = await result.json()
					if (user.message == 'User Created Sucessfully') {
						this.displayToast(
							'success',
							'User Registration Sucessful, Please Check Your Mail For Verification Link'
						)
						this.$router.push('/login')
					} else {
						this.displayToast('error', user.message)
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
	},
	mixins: [ToastMixin],
}
</script>
