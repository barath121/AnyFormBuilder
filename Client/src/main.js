import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import './assets/CSS/index.css';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faSquarePlus  } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Toast , { POSITION }from "vue-toastification";
import "vue-toastification/dist/index.css";
import { vfmPlugin } from 'vue-final-modal'
library.add(faSquarePlus )
const app =createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ContextMenu)
app.use(router);
app.use(Toast,{
    position: POSITION.TOP_RIGHT
});
app.use(vfmPlugin)
app.mount('#app')
