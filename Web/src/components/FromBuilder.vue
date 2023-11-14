<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex flex-row h-full">
      <div class="flex borderRight" id="formPagesListHolder">
        <div class="flex flex-col">
          <div class="flex text-center justify-between p-2 borderBottom">
            <h1>Questions</h1>
            <font-awesome-icon
              icon="square-plus"
              class="text-2xl my-auto icon growAnimation"
              @click="addPage()"
            />
          </div>
          <div
            class="flex flex-col overflow-y-scroll colorWhite cursor-pointer"
            v-if="isLoaded"
          >
            <div class="" v-for="page in pages" :key="page.id">
              <Formpagelist
                :page="page"
                v-on:click="getSelectedPageIndex(page.id)"
                @contextmenu="onContextMenu($event, page.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full  colorWhite basis-11/12 overflow-y-scroll snap-y snap-mandatory hidescroll "
        id="formPagesHolder"
      >
        <Formpage :pages="pages" :selectedpage="selectedpage" v-if="isLoaded" />
      </div>
      <Optionsbar
        :pages="pages"
        :selectedpage="selectedpage"
        v-if="isLoaded"
        @changePageType="pages[selectedpage].pageType = $event"
        @changeQuestion="pages[selectedpage].question = $event"
        @changeChoices="pages[selectedpage].choices = $event"
        @changeIsRequired="pages[selectedpage].isRequired = $event"
        @changeMaxCharacters="pages[selectedpage].maxCharacters = $event"
        @changeFieldName="pages[selectedpage].fieldName = $event"
      />
    </div>
  </div>
</template>
<style>
@import "./../assets/CSS/formBuilder.css";
</style>
<script>
import Navbar from './Formbuilder/Navbar.vue'
import Formpage from './Formbuilder/FormPage.vue'
import Formpagelist from './Formbuilder/FormPageList.vue'
import Optionsbar from './Formbuilder/OptionsBar.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { v4 as uuidv4 } from 'uuid'
import ToastMixin from './../mixins/toast.js'
import CheckAuthMixin from './../mixins/checkAuthorized.js'
export default {
	name: 'FormBuilder',
	components: {
		Navbar,
		Formpage,
		Formpagelist,
		Optionsbar,
	},
	props: {
		page: {
			pageType: { required: true, type: String },
			question: { default: false, type: String },
			choices: [{ required: true, type: String }],
			isRequired: { required: true, type: Boolean },
			id: { required: true, type: Boolean },
		},
	},
	data() {
		return {
			selectedpage: 0,
			pages: [],
			formID: '',
			isLoaded: false,
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
					let pagesData = forms.formData.savedPages
					pagesData.map((el) => {
						delete el._id
						el.id = uuidv4()
					})
					this.pages = pagesData
					this.formID = forms.formData._id
					this.isLoaded = true
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		getSelectedPageIndex(id) {
			this.selectedpage = this.pages.findIndex((page) => page.id === id)
		},
		addPage() {
			let page = {
				pageType: 'Small Text',
				question: 'Add a Question',
				fieldName: 'Question',
				id: uuidv4(),
			}
			this.pages.push(page)
		},
		duplicatePage(id) {
			let selectedPage = this.pages.findIndex((page) => page.id === id)
			let tempPage = JSON.parse(JSON.stringify(this.pages[selectedPage]))
			tempPage.id = uuidv4()
			this.pages.push(tempPage)
		},
		deletePage(id) {
			let selectedPage = this.pages.findIndex((page) => page.id === id)
			if (this.pages.length > 1) this.pages.splice(selectedPage, 1)
			else this.displayToast('error', 'Form must have atleast one page')
		},
		publishForm() {
			if(this.pages.some(el=>!el.fieldName&&el.fieldName!='Statement')){
				this.displayToast('error', 'Please add a field name to every page before publishing')
				return
			} 
			if(this.pages.some(el=>!el.question)){
				this.displayToast('error', 'Please add a question to every page before publishing')
				return
			} 
			if(this.pages.filter(el=>el.pageType=='Check Box'||el.pageType=='Radio Button').some(el=>el.choices.length==0)){
				this.displayToast('error', 'There should be atleast one choice in Check Box and Radio Buttons')
				return
			} 
			if(this.pages.filter(el=>el.pageType!='Statement').some((el,index)=>this.pages.filter(el=>el.pageType!='Statement').map(el=>el.fieldName).indexOf(el.fieldName)!=index)){
				this.displayToast('error', 'All field name should be unique before publishing')
				return
			} 
			let body = {
				_id: this.formID,
				savedPages: this.pages,
				publishedPages: this.pages,
			}
			fetch('/api/form/updateform', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('userToken'),
				},
				body: JSON.stringify(body),
			})
				.then(async (result) => {
					let formUpdatedData = await result.json()
					if (formUpdatedData.message == 'Form Updated Sucessfully') {
						if (navigator.clipboard && window.isSecureContext) {
							navigator.clipboard.writeText(
								`${window.location.origin}/fillform/${this.formID}`
							)
							this.displayToast('success', 'The Form Has Been Published and The Link has Been Copied')
						} else {
							this.displayToast(
								'success',
								`The Form Has Been Published on :  ${
									window.location.origin
								}/fillform/${this.formID}`
							)
						}
					} else {
						this.displayToast('error', formUpdatedData.message)
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		saveForm() {
			let body = {
				_id: this.formID,
				savedPages: this.pages,
			}
			fetch('/api/form/updateform', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('userToken'),
				},
				body: JSON.stringify(body),
			})
				.then(async (result) => {
					let formUpdatedData = await result.json()
					if (formUpdatedData.message == 'Form Updated Sucessfully') {
						this.displayToast('success', 'The pages has been saved')
					} else {
						this.displayToast('error', formUpdatedData.message)
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		onContextMenu(e, id) {
			e.preventDefault()
			this.$contextmenu({
				x: e.x,
				y: e.y,
				items: [
					{
						label: 'Delete',
						onClick: () => {
							this.deletePage(id)
						},
					},
					{
						label: 'Duplicate',
						onClick: () => {
							this.duplicatePage(id)
						},
					},
				],
			})
		},
	},
	mounted() {
		this.checkIfUserLoggedIn()
		this.getPages()
		document.addEventListener('keydown',event=>{
			if(event.ctrlKey && event.key === 's'){
				event.preventDefault()
				this.saveForm()
			}
		})
	},
	mixins: [ToastMixin,CheckAuthMixin],
}
</script>
