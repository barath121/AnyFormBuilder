<template>
    <div class="px-5 py-2 navbar">
        <div class="flex place-content-between h-8 m-2">
            <div>
                <router-link to="/home">
                    <h1>AnyFormBuilder</h1>
                </router-link>
            </div>
            <div class="flex justify-end">
                <button class="buttonalt rounded mr-2"><router-link :to="{path : '/preview/'+this.$route.params.id}">Preview</router-link></button>
                <button class="buttonalt rounded mr-2" @click="publishChanges()">Publish</button>
                <button class="buttonalt rounded mr-2" @click="saveChanges()">Save</button>
            </div>
            </div>
        </div>
</template>
<script>
export default {
name : "Navbar",
data() {
    return {

    }
},
props: ["isPublishModalActive"],
methods :{
    publishChanges(){
        this.$parent.publishForm();
    },
    saveChanges(){
        this.$parent.saveForm();
    }
}

}
</script>