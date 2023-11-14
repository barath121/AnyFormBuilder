<template>
<NavBar/>
  <div
    class="h-screen-90 logincard flex flex-col justify-center items-center"
  >
  <h1 class="text-3xl mb-8">Forgot Password</h1>
  <div class="width-300">
    <form @submit.prevent="forgotPassword()">
      <div class="flex flex-col">
        <label class="mb-4">Email:</label>
        <input type="email" id="email" class="shadow p-1 mb-4 rounded inputBorder" v-model="email" />
      </div>
        <button
          class="w-full mainbutton rounded p-1"
          type="submit"
        >
            Submit
        </button>
    </form>
  </div>
  </div>
</template>
<script>
import ToastMixin from './../mixins/toast.js'
import NavBar from './MainComponents/NavBar.vue'
export default {
	name: 'ForgotPassword',
	components:{
		NavBar
	},
	data() {
		return {
			email : '',
		}
	},
	methods: {
		forgotPassword(){
			let body = {
				email: this.email,
				password: this.password,
			}
			fetch('/api/user/forgotpassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}).then(async (result)=>{
				if(result.status == 200){
					this.displayToast('success','Please Check Your Email.')
				}else if(result.status ==304){
					this.displayToast('error','Account with this email doesnt exist')
				}else{
					this.displayToast('error','Some Internal Error')
				}
			}).catch(err=>{
				this.displayToast('error','Some Internal Error')
			})
		}
	},
	mixins: [ToastMixin],
}
</script>
