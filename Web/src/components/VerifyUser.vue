<template>
</template>
<script>
import ToastMixin from './../mixins/toast'
export default {
	name : 'VerifyUser',
	mounted(){
		fetch(
			`/api/user/verifyuser/${
				this.$route.params.id
			}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		)
			.then(async (result) => {
				if(result.status == 204){
					this.displayToast('error', 'Your token has expired please register again.')
					this.$router.push('/register')
				}if(result.status == 200){
					this.displayToast('success', 'Account has been verified.')
					this.$router.push('/login')        
				}else{
					this.displayToast('error', 'Some Internal Error')
					this.$router.push('/register')
				}
			})
			.catch((err) => {
				this.displayToast('error', 'Some Internal Error')
			})
	},
	mixins : [ToastMixin]
}
</script>