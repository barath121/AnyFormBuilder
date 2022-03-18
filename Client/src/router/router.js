import { createWebHistory,createRouter } from "vue-router";
import FromBuilder from "../components/FromBuilder.vue";
import FormPreview from "../components/FormPreview.vue";
import Dashboard from "../components/Dashboard.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
const history = createWebHistory();
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
            path : '/preview',
            component : FormPreview
        }
    ]
})

export default router;