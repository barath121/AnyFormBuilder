<template>
<NavBar/>
  <div
    class="h-screen-90 logincard flex flex-col justify-center items-center w-screen"
  >
    <h1 class="text-xl">Reset Password</h1>
    <form @submit.prevent="resetPassword()">
      <div class="flex flex-col">
        <label>New Password:</label>
        <input type="password" class="shadow p-1" minlength="8" v-model="password" />
      </div>
      <div class="flex flex-col">
        <label>Confirm Password:</label>
        <input type="password" class="shadow p-1"  minlength="8" v-model="confirmpassword" />
      </div>
      <div class="flex place-content-between my-2">
        <button
          class="button rounded p-1"
          id="loginbtn"
          type="submit"
          @click="login"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import ToastMixin from "./../mixins/toast.js";
import NavBar from "./MainComponents/NavBar.vue";

export default {
  name: "ResetPassword",
  components :{
    NavBar
  },
  data() {
    return {
      password: "",
      confirmpassword: "",
    };
  },
  methods: {
    resetPassword(){
    if(this.password!=this.confirmpassword){
      this.displayToast("error","Passwords do not match")
      return
    }
    let body = {
        token:  this.$route.params.token,
        password: this.password,
    };
    fetch(`${ import.meta.env.VITE_API_URL}/user/changepassword`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(async (result)=>{
      console.log(result)
      if(result.status == 200){
        this.displayToast("success","Password Has Been Changed");
        this.$router.push("/login");
      }else if(result.status ==304){
        this.displayToast("error","Token is Invalid.Please reset Your Password again");
      }else{
        this.displayToast("error","Some Internal Error");
      }
    }).catch(err=>{
        this.displayToast("error","Some Internal Error");
    })
    }
  },
  mounted() {},
  mixins: [ToastMixin],
};
</script>
