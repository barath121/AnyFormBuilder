<template>
<form action="/checkResponse">
     <div class="borderTop colorWhite h-screen overflow-y-scroll snap-y snap-mandatory" v-if="pages.length">
        <div class="" v-for="(page,index) in pages" :key="page.id" >
                <Formpage  :page="page" :isLastPage="isLastPage(index)"/>
        </div>
    </div>
</form>
</template>
<style>
@import "./../assets/CSS/formBuilder.css";
</style>
<script>
import Formpage from './FormPreview/FormPage.vue'
import ToastMixin from './../mixins/toast.js'
import CheckAuthMixin from './../mixins/checkAuthorized.js'
export default {
	name: 'FormPreview',
	components: {
		Formpage
	},
	props: {
		page : {
			pageType: { required: true, type: String },
			question: { default: false, type: String },
			choices: [{ required: true, type: String }],
			isRequired : { required: true, type: Boolean },
			id : {required : true , type : Boolean}
		}
	},
	data() {
		return {
			pages :[]
		}
	},
	methods: {
		getPages() {
			fetch(
				`/api/form/getformpages/${
					this.$route.params.id
				}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('userToken'),
					},
				}
			)
				.then(async (result) => {
					if(result.status=='401')return
					let forms = await result.json()
					this.pages = forms.formData.savedPages
					this.formID = forms.formData._id
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		isLastPage(index){
			return this.pages.length -1 == index
		}
	},
	mounted() {
		this.checkIfUserLoggedIn()
		this.getPages()
	},
	mixins : [ToastMixin,CheckAuthMixin]
}
</script>
