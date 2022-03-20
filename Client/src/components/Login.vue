<template>
<NavBar/>
  <div
    class="h-screen-90 logincard flex flex-col justify-center items-center w-screen"
  >
    <h1 class="text-xl">Login</h1>
    <form>
    <div class="flex flex-col">
      <label>Username:</label>
      <input class="shadow p-1" id="username" v-model="username" />
    </div>
    <div class="flex flex-col">
      <label>Password:</label>
      <input
        type="password"
        class="shadow p-1"
        id="password"
        v-model="password"
      />
    </div>
    <div class="flex place-content-between my-2 ">
      <button
        class="button rounded p-1"
        id="loginbtn"
        type="button"
        @click="login"
      >
        Login
      </button>
      <router-link to="/forgotpassword" class="text-rose-600"
        >Forgot Password?</router-link
      >
    </div>
    </form>
    <p class="text-sm">
      Need a account?<router-link to="/register" class="text-green-500"
        >Create One!</router-link
      >
    </p>
  </div>
</template>
<script>
import ToastMixin from "./../mixins/toast.js";
import CheckAuthMixin from "./../mixins/checkAuthorized.js";
import NavBar from "./MainComponents/NavBar.vue";
export default {
  name: "Login",
  components:{
    NavBar
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
    if(this.username.length<1||this.password.length<1){
      this.displayToast("error","Enter Username and Password before logging in")
      return ;
    }
    let body = {
        username: this.username,
        password: this.password,
    };
    fetch(`${ import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(async (result)=>{
      let user = await  result.json();
      console.log(user.message)
      if(user.message =="Signin Sucessful"){
        this.displayToast("success","Login Sucessful");
        localStorage.setItem("userToken",user.token);
        this.$router.push("/home");
      }else{
        this.displayToast("error",user.message);
      }
    }).catch(err=>{
        this.displayToast("error","Some Internal Error");
    })
    },
  },
  mounted(){
  this.routerUserToHome();
  },
  mixins : [ToastMixin,CheckAuthMixin]
};
</script>
