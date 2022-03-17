<template>
    <div class="flex place-content-between h-8 m-2">
            <div class="">
                <a href="./dashboard.html">
                    <h1>AnyFormBuilder</h1>
                </a>
            </div>
            <div class="flex justify-end">
                <button class="navbuttons rounded mr-2"><a href="./preview.html">Preview</a></button>
                <button class="navbuttons rounded mr-2" @click="publishChanges">Publish</button>
                <button class="navbuttons rounded mr-2" @click="saveChanges">Save</button>
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
        this.$parent.displayToast("success","Form Changes Published and Link Has Been Copied")
        navigator.clipboard.writeText("Copied Text");
    },
    saveChanges(){
        this.$parent.displayToast("success","Form Changes Have Been Saved")
    }
}

}
</script>