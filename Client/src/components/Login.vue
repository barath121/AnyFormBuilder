<template>
    <div class="h-screen logincard flex flex-col justify-center items-center  w-screen">
        <h1 class="text-xl">Login</h1>
        <form class="max-w-xs">
            <div class="flex flex-col">
                <label>Username:</label>
                <input class="shadow p-1" id="username">
            </div>
            <div class="flex flex-col">
                <label>Password:</label>
                <input type="password" class="shadow p-1" id="password">
            </div>
            <div class="flex place-content-between my-2 text-rose-600">
                <button class="button rounded p-1"  id="loginbtn" type="button">Login</button>
                <a href="#">Forgot Password?</a>
            </div>
        </form>
        <p class="text-sm ">Need a account?<a href="./register.html" class="text-green-500">Create One!</a></p>
    </div>
</template>
<script>
export default {
    name : "Login"
}
</script>