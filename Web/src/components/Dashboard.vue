<template>
  <div>
    <vue-final-modal
      v-model="isModalActive"
      classes="modal-container"
      content-class="modal-content"
    >
      <button class="modal__close" @click="closeModal()">X</button>
      <div v-if="renameFormModal">
        <span class="modal__title">Rename Form Title</span>
        <div class="modal__content flex flex-col">
          <input type="text" class="rounded p-1 inputBorder" v-model="currentTitle" />
          <button
            type="button"
            class="button rounded my-2"
            @click="renameFormTitle()"
          >
            Rename
          </button>
        </div>
      </div>
      <div v-if="createFormModal">
        <span class="modal__title">Create Form</span>
        <div class="modal__content flex flex-col">
          <input type="text" class="rounded p-1 inputBorder" v-model="newFormTitle" />
          <button
            type="button"
            class="button rounded my-2"
            @Click="createForm()"
          >
            Create
          </button>
        </div>
      </div>
    </vue-final-modal>
  </div>
  <div class="px-5 pt-4 pb-2 navbar">
    <div class="flex place-content-between">
      <div class="ml-2">
        <h1>AnyFormBuilder</h1>
      </div>
      <div class="flex mr-2 place-content-between">
        <button class="buttonalt rounded ml-2 mb-2" @click="logout()">
          Logout
        </button>
      </div>
    </div>
  </div>
  <div class="addForm">
    <font-awesome-icon
      icon="circle-plus"
      class="text-5xl my-auto icon growAnimation"
      @click="createFormModalBox()"
    />
  </div>
  <div class="flex md:flex-row flex-col items-center justify-center py-8">
    <div class="mx-4 my-2">
      <input
        type="text"
        name="search"
        class="width-300 shadow focus:outline-none rounded inputBorder"
        v-model="searchTitle"
      />
    </div>
    <div class="mx-4 my-4">
      <select
        class="rounded selectPadding"
        v-model="sortBy"
        name="sortby"
      >
        <option value="updatedAt">Last Modified</option>
        <option value="createdAt">Created On</option>
        <option value="title">Title</option>
      </select>
    </div>
    <div class="mx-4 my-4">
      <button class="button rounded" @click="getForms()">Search</button>
    </div>
  </div>
  <div class="items-center mx-4">
    <table class="w-full table-auto">
      <thead class="text-left">
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Created On</th>
          <th>Last Modified</th>
          <th>Pages</th>
        </tr>
      </thead>
      <tbody>
      <tr
        v-for="(form, index) in forms"
        :key="index + form.title"
        @contextmenu="onContextMenu($event, index)"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <div class="truncate w-16 py-1">
            <router-link :to="{ path: '/formbuilder/' + form._id }">{{
              form.title
            }}</router-link>
          </div>
        </td>
        <td>{{ toDateWithTime(form.createdAt) }}</td>
        <td>{{ toDateWithTime(form.updatedAt) }}</td>
        <td>{{ form.savedPages.length }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
@import url("./../assets/CSS/modal.css");
</style>
<script>
import ContextMenu from '@imengyu/vue3-context-menu'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import ToastMixin from './../mixins/toast.js'
import CheckAuthMixin from './../mixins/checkAuthorized.js'
export default {
	name: 'Dashboard',
	components: {
		ContextMenu,
		VueFinalModal,
		ModalsContainer,
	},
	data() {
		return {
			isModalActive: false,
			renameFormModal: false,
			createFormModal: false,
			newFormTitle: '',
			currentTitle: '',
			selectedIndex: 0,
			forms: [],
			searchTitle: '',
			sortBy: 'updatedAt',
		}
	},
	methods: {
		getForms() {
			fetch(
				`/api/form/getforms?sortBy=${
					this.sortBy
				}&title=${this.searchTitle}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('userToken'),
					},
				}
			)
				.then(async (result) => {
					if (result.status == '401') return
					let forms = await result.json()
					this.forms = forms.userForms
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		closeModal() {
			this.isModalActive = false
			this.renameFormModal = false
			this.createFormModal = false
		},
		createForm() {
			if (this.newFormTitle.length) {
				let form = {
					title: this.newFormTitle,
					savedPages: [
						{
							fieldName: 'name',
							pageType: 'Small Text',
							question: 'What is your Question',
						},
					],
				}
				fetch('/api/form/createform', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('userToken'),
					},
					body: JSON.stringify(form),
				}).then(async (result) => {
					let formCreatedData = await result.json()
					if (formCreatedData.message == 'Form Created Sucessfully') {
						this.displayToast('success', 'The Form has been Created')
						this.getForms();
						(this.createFormModal = false), (this.isModalActive = false)
					} else {
						this.displayToast('error', formCreatedData.message)
					}
				})
			} else {
				this.displayToast('warning', 'Add a title before creating')
			}
		},
		toDateWithTime(date) {
			return (
				new Date(date).toLocaleTimeString() +
        ', ' +
        new Date(date).toDateString()
			)
		},
		renameTitleModalBox(index) {
			this.selectedIndex = index
			this.currentTitle = this.forms[index].title
			this.renameFormModal = true
			this.isModalActive = true
		},
		createFormModalBox() {
			this.createFormModal = true
			this.isModalActive = true
		},
		renameFormTitle() {
			if (this.currentTitle == this.forms[this.selectedIndex].title)
				this.displayToast(
					'warning',
					'The Form Title is already ' + this.currentTitle
				)
			else {
				let body = {
					_id: this.forms[this.selectedIndex]._id,
					title: this.currentTitle,
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
							this.closeModal()
							this.displayToast('success', 'The Form has been renamed')
							this.forms[this.selectedIndex].title = this.currentTitle
						} else {
							this.displayToast('error', formUpdatedData.message)
						}
					})
					.catch((err) => {
						this.displayToast('error', 'Some Internal Error')
					})
			}
		},
		deleteForm(index) {
			let body = {
				_id: this.forms[index]._id,
			}
			fetch('/api/form/deleteform', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('userToken'),
				},
				body: JSON.stringify(body),
			})
				.then(async (result) => {
					let deletedFormData = await result.json()
					if (deletedFormData.message == 'Form Deleted Sucessfully') {
						this.displayToast('success', 'The Form has been deleted')
						this.forms.splice(index, 1)
					} else {
						this.displayToast('error', deletedFormData.message)
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		getFormResponses(index) {
			fetch(
				`/api/form/getformresponses/${
					this.forms[index]._id
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
					if (result.status == 204) {
						this.displayToast(
							'info',
							'There is no responses for this form yet'
						)
						return
					} else if (result.status == 200) {
						result.blob().then((xlsxfile) => {
							var a = document.createElement('a')
							a.href = window.URL.createObjectURL(xlsxfile)
							a.download = this.forms[index].title + '.xlsx'
							a.click()
						})
					} else {
						this.displayToast('error', 'Some Internal Error')
					}
				})
				.catch((err) => {
					this.displayToast('error', 'Some Internal Error')
				})
		},
		onContextMenu(e, index) {
			e.preventDefault()
			this.$contextmenu({
				x: e.x,
				y: e.y,
				items: [
					{
						label: 'Rename',
						onClick: () => {
							this.renameTitleModalBox(index)
						},
					},
					{
						label: 'Delete',
						onClick: () => {
							this.deleteForm(index)
						},
					},
					{
						label: 'Get Responses',
						onClick: () => {
							this.getFormResponses(index)
						},
					},
				],
			})
		},
		logout() {
			localStorage.setItem('userToken', null)
			this.displayToast('success', 'User has been logged out.')
			this.$router.push('/login')
		},
	},
	mounted() {
		this.checkIfUserLoggedIn()
		this.getForms()
	},
	mixins: [ToastMixin, CheckAuthMixin],
}
</script>
