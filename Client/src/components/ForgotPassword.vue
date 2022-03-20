<template>
<NavBar/>
  <div
    class="h-screen-90 logincard flex flex-col justify-center items-center"
  >
  <h1 class="text-xl">Forgot Password</h1>
    <form @submit.prevent="forgotPassword()">
      <div class="flex flex-col">
        <label>Email:</label>
        <input type="email" id="email" class="shadow p-1" v-model="email" />
      </div>
      <div class="flex place-content-between my-2">
        <button
          class="button rounded p-1"
          type="submit"
        >
            Submit
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import ToastMixin from "./../mixins/toast.js";
import NavBar from "./MainComponents/NavBar.vue";
export default {
  name: "ForgotPassword",
  components:{
    NavBar
  },
  data() {
    return {
      email : "",
    };
  },
  methods: {
    forgotPassword(){
    let body = {
        email: this.email,
        password: this.password,
    };
    fetch(`${ import.meta.env.VITE_API_URL}/user/forgotpassword`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(async (result)=>{
      console.log(result)
      if(result.status == 200){
        this.displayToast("success","Please Check Your Email.");
      }else if(result.status ==304){
        this.displayToast("error","Account with this email doesnt exist");
      }else{
        this.displayToast("error","Some Internal Error");
      }
    }).catch(err=>{
        this.displayToast("error","Some Internal Error");
    })
    }
  },
  mixins: [ToastMixin],
};
</script>
