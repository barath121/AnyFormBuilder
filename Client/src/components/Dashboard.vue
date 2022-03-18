<template>
    <div class="flex flex-col my-2">
        <div class="flex borderBottom place-content-between">
            <div class="ml-2">
                <a href="./dashboard.html"><h1>AnyFormBuilder</h1></a>
            </div>
            <div class="flex mr-2 place-content-between">
                <img src="https://avatars.githubusercontent.com/u/42098783?v=4" class="h-8 rounded-full mb-1">
                <a href="./login.html"><h1 class="my-1">Barath</h1></a>
            </div>
        </div>
    </div>
    <div class="flex place-content-evenly p-3 borderBottom">
        <div>
            <label for="">Name:</label>
            <input type="text" class="ml-1 p-1 shadow focus:outline-none">
            </div>
            <div>
                <label for="">Sort By</label>
                <select class="rounded p-1 ml-1">
                    <option>Name</option>
                    <option>Created On</option>
                    <option>Last Modified</option>
                </select>
            </div>
        <button class="button rounded">Search</button>
    </div>
    <div class="items-center mx-4">
        <table class="w-full ">
            <thead class="text-left">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Created On</th>
                    <th>Last Modified</th>
                </tr>
            </thead>
            <tr v-for="(form,index) in forms" :key="index+form.title">
                <td>{{index+1}}</td>
                <td><div class="truncate w-64">{{form.title}}</div></td>
                <td>{{form.createdOn}}</td>
                <td>{{form.modifiedOn}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name : "Dashboard",
    data() {
        return {
            forms : [
                {
                    title : "Hello There",
                    createdOn : new Date().toDateString(),
                    modifiedOn : new Date().toDateString(),
                },
                {
                    title : "Hello There1",
                    createdOn : new Date().toDateString(),
                    modifiedOn : new Date().toDateString(),
                },
                {
                    title : "Hello There2",
                    createdOn : new Date().toDateString(),
                    modifiedOn : new Date().toDateString(),
                }
            ]
        }
    },
}
</script>