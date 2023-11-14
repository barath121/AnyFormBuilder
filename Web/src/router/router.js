import { createWebHistory,createRouter } from 'vue-router'
import FromBuilder from '../components/FromBuilder.vue'
import FormPreview from '../components/FormPreview.vue'
import FillForm from '../components/FillForm.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import ResetPassword from '../components/ResetPassword.vue'
import VerifyUser from '../components/VerifyUser.vue'
import PageNotFound from '../components/PageNotFound.vue'
const history = createWebHistory()
const router = createRouter({
	history,
	routes : [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path : '/home',
			component : Dashboard
		},
		{
			path : '/login',
			component : Login
		},
		{
			path : '/register',
			component : Register
		},
		{
			path : '/formbuilder/:id',
			component : FromBuilder
		},
		{
			path : '/fillform/:id',
			component : FillForm
		},
		{
			path : '/preview/:id',
			component : FormPreview
		},
		{
			path : '/forgotpassword',
			component : ForgotPassword
		},
		{
			path : '/resetpassword/:token',
			component : ResetPassword
		},
		{
			path : '/verifyuser/:id',
			component : VerifyUser
		},
		{ 
			path: '/:catchAll(.*)', 
			component: PageNotFound 
		}
	]
})

export default router