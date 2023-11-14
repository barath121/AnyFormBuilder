<template>
    
</template>
<script>
import ToastMixin from './../mixins/toast'

export default {
	name : 'Page Not Found',
	mounted(){
		this.displayToast('error','Page Not Found')
		if(localStorage.getItem('userToken'))
			this.$router.push('/home')
		else
			this.$router.push('/login')
	},
	mixins : [ToastMixin]
}
</script>