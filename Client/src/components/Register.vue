<template>
    <div class="h-screen logincard flex flex-col justify-center items-center  w-screen">
        <h1 class="text-xl">Register</h1>
        <form class="max-w-xs">
            <div class="flex flex-col">
                <label>Username:</label>
                <input class="shadow p-1" id="username">
            </div>
            <div class="flex flex-col">
                <label>Email:</label>
                <input class="shadow p-1" id="email">
            </div>
            <div class="flex flex-col">
                <label>Password:</label>
                <input type="password" class="shadow p-1" id="password">
            </div>
            <div class="flex flex-col">
                <label>Confirm Password:</label>
                <input type="password" class="shadow p-1" id="confirmpassword">
            </div>
            <button class="button rounded p-1 my-2 " type="button" id="registerbutton">Register</button>
        </form>
        <p class="text-sm ">Already Have A Account?<a href="./login.html" class="text-green-500">Login!</a></p>
    </div>
</template>
<script>
export default {
    name : "Register"
}
</script>