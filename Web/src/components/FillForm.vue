<template>
<div class="vld-parent">
        <loading v-model:active="isLoading"
                 :is-full-page="true"/>
</div>
<form @submit.prevent="submitResponse()" enctype="multipart/form-data">
    <div class="borderTop colorWhite h-screen overflow-y-scroll snap-y snap-mandatory" v-if="pages.length&&!formFilled">
        <div v-for="(page,index) in pages" :key="page.id">
                <Formpage  :formFilled="formFilled" :page="page" :isLastPage="isLastPage(index)"/>
        </div>
    </div>
     <div
    class="flex flex-col questionpagepreview colorWhite rounded justify-center items-center m-auto" v-if="formFilled">
    <h1 class="text-3xl break-all">Thanks for filling the form🙌🙌🙌.</h1>
    </div>
    <div
    class="flex flex-col questionpagepreview colorWhite snap-center rounded justify-center items-center m-auto" v-if="!pages.length">
    <h1 class="text-3xl break-all">This Form is no currently accepting any responses.</h1>
    </div>
</form>
</template>
<style>
@import "./../assets/CSS/formBuilder.css";
</style>
<script>
import Formpage from './FillForm/FormPage.vue'
import ToastMixin from './../mixins/toast.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
	name: 'FillForm',
	components: {
		Formpage,
		Loading
	},
	props: {
		page : {
			pageType: { required: true, type: String },
			question: { default: false, type: String },
			choices: [{ required: true, type: String }],
			isRequired : { required: true, type: Boolean },
			id : {required : true , type : Boolean},
			fieldName : {required : true , type : String}
		}
	},
	data() {
		return {
			pages :[],
			formFilled : false,
			isLoading: false,
		}
	},
	methods: {
		startLoader() {
			this.isLoading = true
			setTimeout(() => {
				this.isLoading = false
			}, 5000)
		},
		submitResponse(){
			const responseData  = new FormData()
			this.startLoader()
			this.pages.forEach(page=>{
				if(page.pageType=='Statement')return
				let inputValue = document.getElementsByName(page.fieldName)
				if(page.pageType=='File'){
					responseData.append(page.fieldName,inputValue[0].files[0])
				}
				else if(page.pageType=='Choice Box'||page.pageType=='Radio Button'){
					let choicesStr = ''
					inputValue.forEach(choices=>{
						if(choices.checked )
							choicesStr  = choicesStr + ',' +choices.value
					})
					if(choicesStr.length)
						choicesStr = choicesStr.substring(1)
					responseData.append(page.fieldName,choicesStr)
				}
				else  
					responseData.append(page.fieldName,inputValue[0].value)
			})
			responseData.append('formID',this.$route.params.id)
			fetch('/api/form/saveformresponse', {
				method: 'POST',
				body: responseData  
			}) 
				.then(async (result) => {
					if(result.status==200){
						this.formFilled = true
						localStorage[this.$route.params.id+'FilledForm'] = true
						this.isLoading = false
					}else if(result.status==413){
						this.displayToast('error', 'File Size too Large')
						this.isLoading = false
					}else{
						this.displayToast('error', 'Some Internal Error')
						this.isLoading = false
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
					this.isLoading = false
				})
		},
		getPages() {
			if(localStorage[this.$route.params.id+'FilledForm'])
				this.formFilled = true
			fetch(
				`/api/form/getpublishedpages/${
					this.$route.params.id
				}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
				.then(async (result) => {
					let forms = await result.json()
					this.pages = forms.formData.publishedPages
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
		this.getPages()
	},
	mixins : [ToastMixin]
}
</script>
