import { useToast } from "vue-toastification";

export default{
    data(){
        return {
        toast : useToast()
    }
    },
    methods: {
        displayToast(toastType,toastMessage){
            this.toast[toastType](toastMessage);
        }
    },
}