import ToastMixin from "./toast.js";
export default{
    methods: {
        checkIfUserLoggedIn(){
            fetch(`${ import.meta.env.VITE_API_URL}/user/istokenvalid`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("userToken"),
                }
            }).then(async (result)=>{
                if(result.status==401){
                    this.displayToast("error","Please login to continue");
                    this.$router.push("/login");
                }
            }).catch(err=>{
                this.displayToast("error","Some Internal Error");
            })
        },
        routerUserToHome(){
            fetch(`${ import.meta.env.VITE_API_URL}/user/istokenvalid`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("userToken"),
                }
            }).then(async (result)=>{
                if(result.status==200){
                    this.displayToast("success","Welcome Back");
                    this.$router.push("/home");
                }
            }).catch(err=>{
                this.displayToast("error","Some Internal Error");
            })
        }
    },
    mixins : [ToastMixin]
}